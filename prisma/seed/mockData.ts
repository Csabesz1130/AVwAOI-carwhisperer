import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const splitSql = (sql: string) => {
  return sql.split(';').filter(content => content.trim() !== '')
}

async function main() {
  const sql = `

INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('387a1b47-6715-4ad1-8103-96f83870293e', '1Berenice16@yahoo.com', 'Michael Brown', 'https://i.imgur.com/YfJQV5z.png?id=3', 'inv456def', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('ff658e04-8ad7-48f1-afd0-0f99acc028c8', '9Simone_Fisher6@yahoo.com', 'Michael Brown', 'https://i.imgur.com/YfJQV5z.png?id=11', 'inv012jkl', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('1d25c1b0-8920-4410-a620-e5c1748f24e4', '17Vinnie.Kub32@gmail.com', 'Michael Brown', 'https://i.imgur.com/YfJQV5z.png?id=19', 'inv456def', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('ec9db903-0f15-4711-968d-05a3bc3e5dcc', '25Carmelo.Feeney69@yahoo.com', 'David Wilson', 'https://i.imgur.com/YfJQV5z.png?id=27', 'inv012jkl', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('b295d13e-93b9-4b48-a916-f5ec29367dfb', '33Darwin_Keebler68@gmail.com', 'Michael Brown', 'https://i.imgur.com/YfJQV5z.png?id=35', 'inv456def', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('4fbdfbe3-2793-44cb-a677-ce605f72c3d4', '49Sibyl.Wunsch10@gmail.com', 'Michael Brown', 'https://i.imgur.com/YfJQV5z.png?id=51', 'inv012jkl', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('51ee122e-483a-4744-ad0c-b399ce452831', '57Kristin.Daniel86@hotmail.com', 'Jane Smith', 'https://i.imgur.com/YfJQV5z.png?id=59', 'inv012jkl', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('9f43142b-7212-4dcb-b276-86ede8278f1a', '65Gerson_Gerlach@yahoo.com', 'David Wilson', 'https://i.imgur.com/YfJQV5z.png?id=67', 'inv345mno', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('0004fb34-b231-441e-9dcd-a75b30b91233', '73Leonardo19@gmail.com', 'Jane Smith', 'https://i.imgur.com/YfJQV5z.png?id=75', 'inv345mno', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');

INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('ba398cab-4308-4050-ac3f-21f52a21906f', 'AutoHub Solutions', 'https://i.imgur.com/YfJQV5z.png?id=82');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('ec557431-3370-4bb6-bf11-b6dc1745429d', 'CarChoice Dynamics', 'https://i.imgur.com/YfJQV5z.png?id=85');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('74dbafd1-3b21-4c75-b289-62cbb846ff47', 'RoadMaster Enterprises', 'https://i.imgur.com/YfJQV5z.png?id=88');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('f16edaa1-6f3b-48b3-b62a-a37d10eb522a', 'AutoHub Solutions', 'https://i.imgur.com/YfJQV5z.png?id=91');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('bedbbea4-fe09-4c69-b0ef-e894f3c08930', 'DriveSmart Innovations', 'https://i.imgur.com/YfJQV5z.png?id=94');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('0c28fb06-d65c-4ba9-bbc9-7afbe271ebf7', 'VehicleVisionaries', 'https://i.imgur.com/YfJQV5z.png?id=97');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('412edd09-c819-49e5-a0bc-45cbf3774171', 'VehicleVisionaries', 'https://i.imgur.com/YfJQV5z.png?id=100');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('0af0e453-7e63-4590-bda5-9c4d4ff521e9', 'VehicleVisionaries', 'https://i.imgur.com/YfJQV5z.png?id=103');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('2bed22e4-4d39-49fb-b80e-2411cf3c8094', 'VehicleVisionaries', 'https://i.imgur.com/YfJQV5z.png?id=106');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('869e49ad-eee7-4e2f-a9dc-54d64b1c5470', 'AutoHub Solutions', 'https://i.imgur.com/YfJQV5z.png?id=109');

INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('41a4d8ec-cbf6-46bd-a3f3-c7f89c4f7aa7', 'Product Analyst', 'b295d13e-93b9-4b48-a916-f5ec29367dfb', 'ba398cab-4308-4050-ac3f-21f52a21906f');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('6b2fc966-1572-4c8b-a9dd-f4a825cd1f02', 'Technical Advisor', 'b295d13e-93b9-4b48-a916-f5ec29367dfb', 'ec557431-3370-4bb6-bf11-b6dc1745429d');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('1e53623b-fa05-4fba-8f8a-dbe36d6cb136', 'Customer Support Agent', '9f43142b-7212-4dcb-b276-86ede8278f1a', '2bed22e4-4d39-49fb-b80e-2411cf3c8094');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('2a28b540-0998-4d7f-9c05-5404c855866c', 'Marketing Specialist', 'b295d13e-93b9-4b48-a916-f5ec29367dfb', '869e49ad-eee7-4e2f-a9dc-54d64b1c5470');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('e5ce637e-4c10-46eb-ad5f-5fe20ba3047d', 'Sales Manager', '9f43142b-7212-4dcb-b276-86ede8278f1a', 'f16edaa1-6f3b-48b3-b62a-a37d10eb522a');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('aba03d3b-0100-4862-8d3c-8788f4e6993f', 'Technical Advisor', 'ec9db903-0f15-4711-968d-05a3bc3e5dcc', 'ec557431-3370-4bb6-bf11-b6dc1745429d');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('c1c43304-65f3-4419-851d-7bd6fc108eba', 'Technical Advisor', '9f43142b-7212-4dcb-b276-86ede8278f1a', '0af0e453-7e63-4590-bda5-9c4d4ff521e9');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('2527da36-434e-46b4-a2e9-27af601515e6', 'Technical Advisor', '387a1b47-6715-4ad1-8103-96f83870293e', '74dbafd1-3b21-4c75-b289-62cbb846ff47');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('89a228fb-6e51-4455-bff1-9228fdecb753', 'Sales Manager', 'ff658e04-8ad7-48f1-afd0-0f99acc028c8', 'ec557431-3370-4bb6-bf11-b6dc1745429d');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('e15a4c8b-60d0-4f9e-a890-e160a9599a6a', 'Customer Support Agent', '1d25c1b0-8920-4410-a620-e5c1748f24e4', '869e49ad-eee7-4e2f-a9dc-54d64b1c5470');

INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('7c6085ad-9abb-469e-ab2d-478c17526ff8', 'Get notified about the best car deals and new arrivals in your area.', '387a1b47-6715-4ad1-8103-96f83870293e');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('541da211-84b0-458a-8622-1bdc67272096', 'Subscribe to get the latest car recommendations tailored to your lifestyle.', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('d909e3ed-2c83-4970-aa87-614eb92baedf', 'Unlock premium features by subscribing to our car recommendation service.', 'b295d13e-93b9-4b48-a916-f5ec29367dfb');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('69548902-85ab-4736-8efb-3d3be2d5f7c3', 'Unlock premium features by subscribing to our car recommendation service.', '0004fb34-b231-441e-9dcd-a75b30b91233');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('5c95323b-241a-4b8e-915f-dfaaa6712ae0', 'Subscribe to get the latest car recommendations tailored to your lifestyle.', '9f43142b-7212-4dcb-b276-86ede8278f1a');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('f7251ea9-75c7-4a39-b904-19f74df35694', 'Subscribe to get the latest car recommendations tailored to your lifestyle.', 'ff658e04-8ad7-48f1-afd0-0f99acc028c8');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('e3a6e3d6-9b00-4126-818b-5a86387dcfcb', 'Get notified about the best car deals and new arrivals in your area.', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('6a19767f-d95e-4050-8603-7014ce84ea62', 'Stay updated with personalized car suggestions and market insights.', '9f43142b-7212-4dcb-b276-86ede8278f1a');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('d0d257bf-2b77-4452-b478-7ff50b6b9fa8', 'Stay updated with personalized car suggestions and market insights.', '51ee122e-483a-4744-ad0c-b399ce452831');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('166084f8-f24a-4fa0-8802-d46c155c8a9a', 'Get notified about the best car deals and new arrivals in your area.', '1d25c1b0-8920-4410-a620-e5c1748f24e4');

INSERT INTO "Car" ("id", "make", "model", "year", "color", "imageUrl", "description") VALUES ('bac729c4-f83d-4711-b392-e002a21f7012', 'Honda', 'Mustang', 109, 'White', 'https://i.imgur.com/YfJQV5z.png?id=155', 'A compact car known for its efficiency and reliability.');
INSERT INTO "Car" ("id", "make", "model", "year", "color", "imageUrl", "description") VALUES ('710e76f9-6833-4c59-838f-c2d283075d71', 'Honda', 'Model 3', 228, 'Silver', 'https://i.imgur.com/YfJQV5z.png?id=162', 'A compact car known for its efficiency and reliability.');
INSERT INTO "Car" ("id", "make", "model", "year", "color", "imageUrl", "description") VALUES ('ceec0070-bd4d-4d49-97c4-3dc3eb211784', 'Honda', 'Model 3', 714, 'Red', 'https://i.imgur.com/YfJQV5z.png?id=169', 'A compact car known for its efficiency and reliability.');
INSERT INTO "Car" ("id", "make", "model", "year", "color", "imageUrl", "description") VALUES ('b11aff1f-ce18-48c5-b165-6ee7a9f13580', 'Toyota', 'Civic', 401, 'Blue', 'https://i.imgur.com/YfJQV5z.png?id=176', 'A compact car known for its efficiency and reliability.');
INSERT INTO "Car" ("id", "make", "model", "year", "color", "imageUrl", "description") VALUES ('6d0e8629-c2d1-4899-99a1-52cbe45c55f9', 'Tesla', 'X5', 964, 'Silver', 'https://i.imgur.com/YfJQV5z.png?id=183', 'A classic American muscle car with a powerful engine.');
INSERT INTO "Car" ("id", "make", "model", "year", "color", "imageUrl", "description") VALUES ('5c3e7b66-104a-4703-8e9b-2c06e8c91fc5', 'Honda', 'X5', 386, 'Silver', 'https://i.imgur.com/YfJQV5z.png?id=190', 'A reliable and fuelefficient sedan perfect for family trips.');
INSERT INTO "Car" ("id", "make", "model", "year", "color", "imageUrl", "description") VALUES ('837ca37c-2bda-42c8-986a-686a9ad68ceb', 'Tesla', 'Model 3', 845, 'Red', 'https://i.imgur.com/YfJQV5z.png?id=197', 'A reliable and fuelefficient sedan perfect for family trips.');
INSERT INTO "Car" ("id", "make", "model", "year", "color", "imageUrl", "description") VALUES ('73e50c7f-d636-4c9b-bc1b-cbc990a4c1c5', 'BMW', 'Mustang', 831, 'Silver', 'https://i.imgur.com/YfJQV5z.png?id=204', 'An electric sedan with cuttingedge features and performance.');
INSERT INTO "Car" ("id", "make", "model", "year", "color", "imageUrl", "description") VALUES ('fe56c383-16d5-4dbd-8b58-eb6be83d80be', 'Ford', 'Civic', 908, 'White', 'https://i.imgur.com/YfJQV5z.png?id=211', 'A compact car known for its efficiency and reliability.');
INSERT INTO "Car" ("id", "make", "model", "year", "color", "imageUrl", "description") VALUES ('ef391b7b-e71c-4ef8-ac84-65fa6e39930a', 'Toyota', 'Civic', 47, 'White', 'https://i.imgur.com/YfJQV5z.png?id=218', 'A compact car known for its efficiency and reliability.');

INSERT INTO "UserPreference" ("id", "preferenceType", "preferenceValue", "userId") VALUES ('9720ad07-0bfe-4c0a-bd52-accff8b842eb', 'Performance', 'Under 30000', '4fbdfbe3-2793-44cb-a677-ce605f72c3d4');
INSERT INTO "UserPreference" ("id", "preferenceType", "preferenceValue", "userId") VALUES ('68c6f533-18eb-4ff3-b552-c72325d0d7ad', 'Performance', 'Advanced', 'ec9db903-0f15-4711-968d-05a3bc3e5dcc');
INSERT INTO "UserPreference" ("id", "preferenceType", "preferenceValue", "userId") VALUES ('72e272b6-1d73-4a3d-bc77-2e91c9f68ca2', 'Fuel Efficiency', 'Advanced', '387a1b47-6715-4ad1-8103-96f83870293e');
INSERT INTO "UserPreference" ("id", "preferenceType", "preferenceValue", "userId") VALUES ('e2fb2674-c03a-4cb1-bd5e-71ff09428738', 'Budget', 'Advanced', 'ff658e04-8ad7-48f1-afd0-0f99acc028c8');
INSERT INTO "UserPreference" ("id", "preferenceType", "preferenceValue", "userId") VALUES ('768d465a-aed2-4dc4-af39-0f5dcfc314b4', 'Technology', 'Sporty', '51ee122e-483a-4744-ad0c-b399ce452831');
INSERT INTO "UserPreference" ("id", "preferenceType", "preferenceValue", "userId") VALUES ('599d331a-8910-4ce4-8999-b3e6057d18a1', 'Safety Features', 'Advanced', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "UserPreference" ("id", "preferenceType", "preferenceValue", "userId") VALUES ('87c46af7-9dc7-4f9f-ad23-dfa209cbaf74', 'Fuel Efficiency', 'Advanced', '4fbdfbe3-2793-44cb-a677-ce605f72c3d4');
INSERT INTO "UserPreference" ("id", "preferenceType", "preferenceValue", "userId") VALUES ('a2ff21b9-fbda-4401-b39b-7f2335bee5b6', 'Fuel Efficiency', 'Advanced', 'b295d13e-93b9-4b48-a916-f5ec29367dfb');
INSERT INTO "UserPreference" ("id", "preferenceType", "preferenceValue", "userId") VALUES ('9ed12c7e-8210-4a55-9815-81079d0a03e8', 'Safety Features', 'Latest', '51ee122e-483a-4744-ad0c-b399ce452831');
INSERT INTO "UserPreference" ("id", "preferenceType", "preferenceValue", "userId") VALUES ('ba98c8bb-79ca-4965-a959-698b78b28bee', 'Technology', 'Advanced', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');

INSERT INTO "QuestionnaireResponse" ("id", "responses", "userId") VALUES ('83d7564c-0d77-4518-9851-ec219c978af0', 'I want an ecofriendly vehicle with a spacious interior for long trips.', '4fbdfbe3-2793-44cb-a677-ce605f72c3d4');
INSERT INTO "QuestionnaireResponse" ("id", "responses", "userId") VALUES ('a5c9cf51-96d3-4a15-a46e-29d1edeaa71d', 'Looking for a sporty car with advanced tech features and a reasonable budget.', 'ff658e04-8ad7-48f1-afd0-0f99acc028c8');
INSERT INTO "QuestionnaireResponse" ("id", "responses", "userId") VALUES ('8fae3cc7-f454-4247-be2c-82e88478187b', 'Looking for a sporty car with advanced tech features and a reasonable budget.', 'b295d13e-93b9-4b48-a916-f5ec29367dfb');
INSERT INTO "QuestionnaireResponse" ("id", "responses", "userId") VALUES ('2ccfdde7-7182-4d91-9c2e-5e015cf351bb', 'Looking for a sporty car with advanced tech features and a reasonable budget.', '4fbdfbe3-2793-44cb-a677-ce605f72c3d4');
INSERT INTO "QuestionnaireResponse" ("id", "responses", "userId") VALUES ('6785f2a8-c24b-416e-9f38-40d378971837', 'Looking for a sporty car with advanced tech features and a reasonable budget.', '9f43142b-7212-4dcb-b276-86ede8278f1a');
INSERT INTO "QuestionnaireResponse" ("id", "responses", "userId") VALUES ('5e0ac778-b819-47d6-b3ac-fdd7d8b309ef', 'I need a family car with good fuel efficiency and safety features.', '387a1b47-6715-4ad1-8103-96f83870293e');
INSERT INTO "QuestionnaireResponse" ("id", "responses", "userId") VALUES ('b87de462-c523-4b33-8002-adc1bdde89e2', 'I need a family car with good fuel efficiency and safety features.', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "QuestionnaireResponse" ("id", "responses", "userId") VALUES ('dc88b217-816c-4def-9479-c95886198ee3', 'I want an ecofriendly vehicle with a spacious interior for long trips.', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "QuestionnaireResponse" ("id", "responses", "userId") VALUES ('0fb3145a-0177-4939-85b8-64fc0a0a28af', 'Interested in a luxury SUV with topnotch safety and comfort features.', 'ff658e04-8ad7-48f1-afd0-0f99acc028c8');
INSERT INTO "QuestionnaireResponse" ("id", "responses", "userId") VALUES ('a47d8d42-dc47-4c3c-92cc-2a97dbd7559d', 'Searching for a compact car thats easy to park and has great mileage.', 'ec9db903-0f15-4711-968d-05a3bc3e5dcc');

INSERT INTO "UserCar" ("id", "ownershipStatus", "purchaseDate", "userId", "carId") VALUES ('857a391f-c406-4006-b9e7-ba3aedb8a487', 'Financed', '2023-12-23T08:49:08.381Z', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', 'fe56c383-16d5-4dbd-8b58-eb6be83d80be');
INSERT INTO "UserCar" ("id", "ownershipStatus", "purchaseDate", "userId", "carId") VALUES ('03b7a345-f4d8-42b9-b193-008e5910ee22', 'Financed', '2025-02-06T12:47:35.367Z', '9f43142b-7212-4dcb-b276-86ede8278f1a', 'bac729c4-f83d-4711-b392-e002a21f7012');
INSERT INTO "UserCar" ("id", "ownershipStatus", "purchaseDate", "userId", "carId") VALUES ('cc4c3506-8e50-42b9-a67f-a33cece6af50', 'Company Car', '2024-01-29T10:22:38.084Z', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', 'fe56c383-16d5-4dbd-8b58-eb6be83d80be');
INSERT INTO "UserCar" ("id", "ownershipStatus", "purchaseDate", "userId", "carId") VALUES ('efad51a1-6830-4e01-ba2c-1ea42120ff1f', 'Rented', '2024-08-01T13:12:16.864Z', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', 'ef391b7b-e71c-4ef8-ac84-65fa6e39930a');
INSERT INTO "UserCar" ("id", "ownershipStatus", "purchaseDate", "userId", "carId") VALUES ('a518259e-58a8-4b5d-9d22-9d85badb02b4', 'Financed', '2024-03-15T07:30:56.140Z', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', 'ceec0070-bd4d-4d49-97c4-3dc3eb211784');
INSERT INTO "UserCar" ("id", "ownershipStatus", "purchaseDate", "userId", "carId") VALUES ('a733c532-a37d-45a3-84b8-900c977f3c47', 'Rented', '2024-10-09T10:34:01.141Z', '0004fb34-b231-441e-9dcd-a75b30b91233', '6d0e8629-c2d1-4899-99a1-52cbe45c55f9');
INSERT INTO "UserCar" ("id", "ownershipStatus", "purchaseDate", "userId", "carId") VALUES ('089baf5b-6264-4f0e-b995-343f3616f820', 'Company Car', '2024-07-07T12:57:21.839Z', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '5c3e7b66-104a-4703-8e9b-2c06e8c91fc5');
INSERT INTO "UserCar" ("id", "ownershipStatus", "purchaseDate", "userId", "carId") VALUES ('d29cbdde-33a9-4648-a7c8-6720aee9720f', 'Rented', '2025-01-13T18:53:24.843Z', '51ee122e-483a-4744-ad0c-b399ce452831', '6d0e8629-c2d1-4899-99a1-52cbe45c55f9');
INSERT INTO "UserCar" ("id", "ownershipStatus", "purchaseDate", "userId", "carId") VALUES ('53eaae2b-4889-4487-9c41-1c2386c3731d', 'Company Car', '2024-02-26T07:02:37.841Z', 'ff658e04-8ad7-48f1-afd0-0f99acc028c8', '73e50c7f-d636-4c9b-bc1b-cbc990a4c1c5');
INSERT INTO "UserCar" ("id", "ownershipStatus", "purchaseDate", "userId", "carId") VALUES ('d8ddea38-8bb7-445d-be86-5ce58a6d4bf4', 'Owned', '2024-09-08T05:12:58.661Z', 'ec9db903-0f15-4711-968d-05a3bc3e5dcc', 'ceec0070-bd4d-4d49-97c4-3dc3eb211784');

INSERT INTO "Recommendation" ("id", "reason", "userId", "carId") VALUES ('02cf7367-c546-4d5c-9a15-f90683171051', 'Perfect for families with spacious interior and top safety ratings.', 'ff658e04-8ad7-48f1-afd0-0f99acc028c8', '73e50c7f-d636-4c9b-bc1b-cbc990a4c1c5');
INSERT INTO "Recommendation" ("id", "reason", "userId", "carId") VALUES ('fa3bcaf1-869f-467a-a8d6-55a967fee827', 'Great for city driving with compact size and easy maneuverability.', '9f43142b-7212-4dcb-b276-86ede8278f1a', 'fe56c383-16d5-4dbd-8b58-eb6be83d80be');
INSERT INTO "Recommendation" ("id", "reason", "userId", "carId") VALUES ('214bfb56-cb99-42a4-a052-22f90ca118cc', 'Perfect for families with spacious interior and top safety ratings.', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', 'ef391b7b-e71c-4ef8-ac84-65fa6e39930a');
INSERT INTO "Recommendation" ("id", "reason", "userId", "carId") VALUES ('e85a0d86-65e8-43a2-a4d2-368877b87c36', 'Budgetfriendly option with low maintenance costs and reliable performance.', '0004fb34-b231-441e-9dcd-a75b30b91233', '6d0e8629-c2d1-4899-99a1-52cbe45c55f9');
INSERT INTO "Recommendation" ("id", "reason", "userId", "carId") VALUES ('9491146d-ac90-4c98-be9d-169bfbb6ebe6', 'Ideal for longdistance travel with excellent fuel efficiency.', '387a1b47-6715-4ad1-8103-96f83870293e', '6d0e8629-c2d1-4899-99a1-52cbe45c55f9');
INSERT INTO "Recommendation" ("id", "reason", "userId", "carId") VALUES ('49058e99-3606-40b9-8958-1b58356727b4', 'Ideal for longdistance travel with excellent fuel efficiency.', '4fbdfbe3-2793-44cb-a677-ce605f72c3d4', '837ca37c-2bda-42c8-986a-686a9ad68ceb');
INSERT INTO "Recommendation" ("id", "reason", "userId", "carId") VALUES ('eb2a5d61-a6e2-4d25-bf4a-5583676a48a9', 'Perfect for families with spacious interior and top safety ratings.', '1d25c1b0-8920-4410-a620-e5c1748f24e4', 'ceec0070-bd4d-4d49-97c4-3dc3eb211784');
INSERT INTO "Recommendation" ("id", "reason", "userId", "carId") VALUES ('a3297f9e-2593-4a08-b105-5e62ebfd6217', 'Perfect for families with spacious interior and top safety ratings.', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '5c3e7b66-104a-4703-8e9b-2c06e8c91fc5');
INSERT INTO "Recommendation" ("id", "reason", "userId", "carId") VALUES ('4d00a24e-468d-4603-90f2-8ee3e2de61f4', 'Budgetfriendly option with low maintenance costs and reliable performance.', '51ee122e-483a-4744-ad0c-b399ce452831', 'b11aff1f-ce18-48c5-b165-6ee7a9f13580');
INSERT INTO "Recommendation" ("id", "reason", "userId", "carId") VALUES ('1934ceab-c732-4927-ad14-3ec5e2231554', 'Ideal for longdistance travel with excellent fuel efficiency.', '4fbdfbe3-2793-44cb-a677-ce605f72c3d4', '710e76f9-6833-4c59-838f-c2d283075d71');

INSERT INTO "Deal" ("id", "dealPrice", "dealDate", "status", "contractUrl", "userId", "carId") VALUES ('617e2972-4fa1-483e-b80f-8859e74f0ecf', '22300', '2024-08-13T15:53:10.668Z', 'canceled', 'https://i.imgur.com/YfJQV5z.png?id=324', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '837ca37c-2bda-42c8-986a-686a9ad68ceb');
INSERT INTO "Deal" ("id", "dealPrice", "dealDate", "status", "contractUrl", "userId", "carId") VALUES ('b404a465-4d95-46d8-8417-22d34dc9dbf2', '18500', '2025-04-13T23:13:27.567Z', 'completed', 'https://i.imgur.com/YfJQV5z.png?id=329', 'b295d13e-93b9-4b48-a916-f5ec29367dfb', 'ef391b7b-e71c-4ef8-ac84-65fa6e39930a');
INSERT INTO "Deal" ("id", "dealPrice", "dealDate", "status", "contractUrl", "userId", "carId") VALUES ('76e38330-d95b-4ee2-a076-758a4597694f', '22300', '2024-08-31T02:58:11.284Z', 'in negotiation', 'https://i.imgur.com/YfJQV5z.png?id=334', '51ee122e-483a-4744-ad0c-b399ce452831', '710e76f9-6833-4c59-838f-c2d283075d71');
INSERT INTO "Deal" ("id", "dealPrice", "dealDate", "status", "contractUrl", "userId", "carId") VALUES ('3a94dd93-2ffc-444e-816f-d16d5fc7315e', '25000', '2025-04-04T11:02:56.842Z', 'pending', 'https://i.imgur.com/YfJQV5z.png?id=339', 'ec9db903-0f15-4711-968d-05a3bc3e5dcc', 'ceec0070-bd4d-4d49-97c4-3dc3eb211784');
INSERT INTO "Deal" ("id", "dealPrice", "dealDate", "status", "contractUrl", "userId", "carId") VALUES ('5c5a94ca-e808-4ba9-ba4c-8e28810d5868', '29999', '2025-03-16T13:22:27.023Z', 'active', 'https://i.imgur.com/YfJQV5z.png?id=344', 'b295d13e-93b9-4b48-a916-f5ec29367dfb', 'b11aff1f-ce18-48c5-b165-6ee7a9f13580');
INSERT INTO "Deal" ("id", "dealPrice", "dealDate", "status", "contractUrl", "userId", "carId") VALUES ('9ae0bd7f-d439-404c-99c0-9c651a76c07f', '25000', '2024-03-04T15:56:56.977Z', 'canceled', 'https://i.imgur.com/YfJQV5z.png?id=349', 'b295d13e-93b9-4b48-a916-f5ec29367dfb', 'ef391b7b-e71c-4ef8-ac84-65fa6e39930a');
INSERT INTO "Deal" ("id", "dealPrice", "dealDate", "status", "contractUrl", "userId", "carId") VALUES ('5227d564-d3b1-47ef-987f-668a97bb0f1a', '29999', '2024-12-02T18:45:15.221Z', 'active', 'https://i.imgur.com/YfJQV5z.png?id=354', 'ec9db903-0f15-4711-968d-05a3bc3e5dcc', 'ef391b7b-e71c-4ef8-ac84-65fa6e39930a');
INSERT INTO "Deal" ("id", "dealPrice", "dealDate", "status", "contractUrl", "userId", "carId") VALUES ('1b0678d3-4fca-4297-932d-c753a9b76341', '29999', '2023-12-29T08:32:24.142Z', 'canceled', 'https://i.imgur.com/YfJQV5z.png?id=359', 'ff658e04-8ad7-48f1-afd0-0f99acc028c8', 'fe56c383-16d5-4dbd-8b58-eb6be83d80be');
INSERT INTO "Deal" ("id", "dealPrice", "dealDate", "status", "contractUrl", "userId", "carId") VALUES ('a71b318f-04c9-4b3a-ab09-39ea6cf47903', '25000', '2023-11-26T00:00:55.361Z', 'pending', 'https://i.imgur.com/YfJQV5z.png?id=364', 'b295d13e-93b9-4b48-a916-f5ec29367dfb', '5c3e7b66-104a-4703-8e9b-2c06e8c91fc5');
INSERT INTO "Deal" ("id", "dealPrice", "dealDate", "status", "contractUrl", "userId", "carId") VALUES ('57aa968b-3da1-4349-ac83-ba54d63e826c', '32750', '2025-03-11T13:54:28.043Z', 'completed', 'https://i.imgur.com/YfJQV5z.png?id=369', '51ee122e-483a-4744-ad0c-b399ce452831', 'b11aff1f-ce18-48c5-b165-6ee7a9f13580');

  `

  const sqls = splitSql(sql)

  for (const sql of sqls) {
    try {
      await prisma.$executeRawUnsafe(`${sql}`)
    } catch (error) {
      console.log(`Could not insert SQL: ${error.message}`)
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async error => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
