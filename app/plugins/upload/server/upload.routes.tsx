import { ActionFunction, ActionFunctionArgs, json } from '@remix-run/node'
import { zfd } from 'zod-form-data'
import { AuthenticationServer } from '~/core/authentication/server'
import { UploadService } from './upload.service'
import { UploadFileType } from './upload.type'

export const uploadPrivateAction: ActionFunction = async ({ request }: ActionFunctionArgs) => {
  await AuthenticationServer.getHttpContext({ request })

  const schema = zfd.formData({
    file: zfd.file(),
  })

  try {
    const formData = await request.formData()

    const validationResult = schema.safeParse({
      file: formData.get('file'),
    })

    if (!validationResult.success) {
      console.error(
        '[UploadPrivateAction] Validation failed:',
        validationResult.error.flatten()
      );
      return json(
        {
          error: 'Invalid file input',
          details: validationResult.error.flatten().fieldErrors
        },
        { status: 400 }
      );
    }

    const data = validationResult.data

    const arrayBuffer = await data.file.arrayBuffer()

    const file: UploadFileType = {
      name: data.file.name,
      mimetype: data.file.type,
      buffer: Buffer.from(arrayBuffer),
    }

    const urls = await UploadService.uploadPrivate(file)

    return json(urls?.[0])
  } catch (error) {
    console.error('[UploadPrivateAction] Failed to upload file:', error);
    return json({ error: `Could not upload file due to an internal error.` }, { status: 500 })
  }
}

export const uploadPublicAction: ActionFunction = async ({ request }: ActionFunctionArgs) => {
  await AuthenticationServer.getHttpContext({ request })

  const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
  const schema = zfd.formData({
    file: zfd.file().refine((file) => file.size <= MAX_FILE_SIZE, {
      message: `File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB`,
    }),
  })

  try {
    const formData = await request.formData()

    const validationResult = schema.safeParse({
      file: formData.get('file'),
    })

    if (!validationResult.success) {
      console.error(
        '[UploadPublicAction] Validation failed:',
        validationResult.error.flatten()
      );
      return json(
        {
          error: 'Invalid file input',
          details: validationResult.error.flatten().fieldErrors
        },
        { status: 400 }
      );
    }

    const data = validationResult.data

    const arrayBuffer = await data.file.arrayBuffer()

    const file: UploadFileType = {
      name: data.file.name,
      mimetype: data.file.type,
      buffer: Buffer.from(arrayBuffer),
    }
    const urls = await UploadService.uploadPublic(file)

    return json(urls?.[0])
  } catch (error) {
    console.error('[UploadPublicAction] Failed to upload file:', error);
    
    return json({ error: `Could not upload file due to an internal error.` }, { status: 500 })
  }
}
