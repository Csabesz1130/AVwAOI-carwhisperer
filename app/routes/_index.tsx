import {
  CalculatorOutlined,
  CarOutlined,
  CheckOutlined,
  EditOutlined,
  EyeOutlined,
  LoadingOutlined,
  RobotOutlined,
  SearchOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { useNavigate } from '@remix-run/react'
import { Spin } from 'antd'
import { useEffect, useState } from 'react'
import {
  LandingContainer,
  LandingCTA,
  LandingFAQ,
  LandingFeatures,
  LandingHero,
  LandingHowItWorks,
  LandingPainPoints,
  LandingPricing,
  LandingSocialProof,
  LandingSocialRating,
  LandingTestimonials,
} from '~/designSystem/landing'

export default function Index() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </div>
    )
  }

  const handleGetStarted = () => {
    navigate('/register')
  }

  const handlePackageSelect = (packageTitle: string) => {
    navigate(`/register?plan=${packageTitle.toLowerCase()}`)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  const features = [
    {
      heading: `Personalized Recommendations`,
      description: `Our AI analyzes your lifestyle and preferences to suggest the perfect car for you.`,
      icon: <UserOutlined />,
    },
    {
      heading: `Advanced Filtering`,
      description: `Easily narrow down your options with our intuitive search and filter system.`,
      icon: <SearchOutlined />,
    },
    {
      heading: `Comprehensive Comparisons`,
      description: `Compare multiple vehicles side-by-side to make informed decisions.`,
      icon: <CarOutlined />,
    },
    {
      heading: `Real-time Market Data`,
      description: `Get up-to-date pricing and availability information from dealerships and online marketplaces.`,
      icon: <SettingOutlined />,
    },
    {
      heading: `Expert Reviews`,
      description: `Access professional insights and user reviews for each vehicle.`,
      icon: <EditOutlined />,
    },
    {
      heading: `Seamless Dealership Integration`,
      description: `Connect directly with dealerships to schedule test drives or make purchases.`,
      icon: <CheckOutlined />,
    },
    {
      heading: `Virtual Tours`,
      description: `Experience immersive 360° virtual tours of vehicles from the comfort of your home.`,
      icon: <EyeOutlined />,
    },
    {
      heading: `Cost Calculator`,
      description: `Plan ahead with our comprehensive maintenance and ownership cost calculator.`,
      icon: <CalculatorOutlined />,
    },
    {
      heading: 'Technology Insights',
      description:
        'Learn how modern car technologies work with AI-powered explanations',
      icon: <RobotOutlined />,
    },
  ]

  const testimonials = [
    {
      name: `Alex Turner`,
      designation: `Remote Car Buyer`,
      content: `The virtual tour feature is incredible! I was able to thoroughly inspect my dream car from another state before making the purchase. It saved me time and travel expenses.`,
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      name: `Michael Chen`,
      designation: `Family Man`,
      content: `As a busy dad, I didn't have time to visit multiple dealerships. AutoWhisperer saved me countless hours and helped me find a great family car.`,
      avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
    },
    {
      name: `Emily Rodriguez`,
      designation: `Car Enthusiast`,
      content: `Even as a car buff, I was impressed by AutoWhisperer's detailed recommendations. It introduced me to models I hadn't considered before.`,
      avatar: 'https://randomuser.me/api/portraits/women/27.jpg',
    },
    {
      name: `David Thompson`,
      designation: `Commuter`,
      content: `AutoWhisperer helped me find a fuel-efficient car that fits my daily commute perfectly. I couldn't be happier with my choice!`,
      avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
    },
    {
      name: `Lisa Patel`,
      designation: `Recent Graduate`,
      content: `On a tight budget, I thought finding a reliable car would be impossible. AutoWhisperer proved me wrong and found great options within my price range.`,
      avatar: 'https://randomuser.me/api/portraits/women/52.jpg',
    },
    {
      name: `John Martinez`,
      designation: `Small Business Owner`,
      content: `AutoWhisperer's recommendations for my business needs were spot-on. It saved me time and helped me make a smart investment for my company.`,
      avatar: 'https://randomuser.me/api/portraits/men/17.jpg',
    },
  ]

  const navItems = [
    {
      title: `Features`,
      link: `#features`,
      onClick: () => scrollToSection('features'),
    },
    {
      title: `Pricing`,
      link: `#pricing`,
      onClick: () => scrollToSection('pricing'),
    },
    {
      title: `FAQ`,
      link: `#faq`,
      onClick: () => scrollToSection('faq'),
    },
    {
      title: `Car Technologies`,
      link: `/car-technologies`,
    },
    {
      title: `AI Car Designer`,
      link: `/ai-car-designer`,
    },
  ]

  const packages = [
    {
      title: `Basic`,
      description: `Perfect for occasional car shoppers`,
      monthly: 9,
      yearly: 89,
      features: [
        `Personalized recommendations`,
        `Basic comparison tools`,
        `Virtual tours (limited)`,
      ],
    },
    {
      title: `Pro`,
      description: `Ideal for serious car buyers`,
      monthly: 19,
      yearly: 189,
      features: [
        `Advanced filtering`,
        `Unlimited comparisons`,
        `Expert reviews access`,
        `Virtual tours`,
        `Basic cost calculator`,
      ],
      highlight: true,
    },
    {
      title: `Enterprise`,
      description: `For dealerships and car enthusiasts`,
      monthly: 49,
      yearly: 489,
      features: [
        `Real-time market data`,
        `Dealership integration`,
        `Priority support`,
        `Unlimited virtual tours`,
        `Advanced cost calculator`,
      ],
    },
  ]

  const questionAnswers = [
    {
      question: `How accurate are AutoWhisperer's recommendations?`,
      answer: `Our AI-powered system is highly accurate, with a 95% satisfaction rate among users. We continuously update our algorithms based on user feedback and market trends.`,
    },
    {
      question: `Can I use AutoWhisperer if I'm not sure what type of car I want?`,
      answer: `Absolutely! Our questionnaire is designed to help you discover your preferences, even if you're unsure about what you're looking for initially.`,
    },
    {
      question: `Does AutoWhisperer work with local dealerships?`,
      answer: `Yes, we partner with a wide network of dealerships across the country to provide up-to-date inventory and pricing information.`,
    },
    {
      question: `How often is the vehicle database updated?`,
      answer: `Our database is updated daily to ensure you have access to the most current information on available vehicles and market prices.`,
    },
  ]

  const logos = [
    { url: 'https://i.imgur.com/afwBIFK.png' },
    { url: 'https://i.imgur.com/LlloOPa.png' },
    { url: 'https://i.imgur.com/j8jPb4H.png' },
    { url: 'https://i.imgur.com/mJ1sZFv.png' },
  ]

  const steps = [
    {
      heading: `Complete Our Smart Questionnaire`,
      description: `Answer a few questions about your lifestyle, preferences, and needs.`,
    },
    {
      heading: `Receive Personalized Recommendations`,
      description: `Our AI analyzes your responses and suggests the best vehicles for you.`,
    },
    {
      heading: `Compare and Research`,
      description: `Use our tools to compare options and dive deep into vehicle details.`,
    },
    {
      heading: `Connect with Dealerships`,
      description: `When you're ready, easily connect with dealerships to make your purchase.`,
    },
  ]

  const painPoints = [
    {
      emoji: `😵`,
      title: `Overwhelmed by endless car options`,
    },
    {
      emoji: `⏳`,
      title: `Hours spent researching without clear results`,
    },
    {
      emoji: `😟`,
      title: `Uncertainty about making the right choice`,
    },
  ]

  const avatarItems = [
    {
      src: 'https://randomuser.me/api/portraits/men/51.jpg',
    },
    {
      src: 'https://randomuser.me/api/portraits/women/9.jpg',
    },
    {
      src: 'https://randomuser.me/api/portraits/women/52.jpg',
    },
    {
      src: 'https://randomuser.me/api/portraits/men/5.jpg',
    },
    {
      src: 'https://randomuser.me/api/portraits/men/4.jpg',
    },
  ]

  return (
    <LandingContainer navItems={navItems}>
      <LandingHero
        title={`Find Your Dream Car Without the Hassle`}
        subtitle={`AutoWhisperer uses AI to match you with the perfect vehicle, saving you time and stress.`}
        buttonText={`Get Started`}
        buttonOnClick={handleGetStarted}
        pictureUrl={`https://marblism-dashboard-api--production-public.s3.us-west-1.amazonaws.com/AVwAOI-carwhisperer-U12O`}
        socialProof={
          <LandingSocialRating
            avatarItems={avatarItems}
            numberOfUsers={1000}
            suffixText={`from happy drivers`}
          />
        }
      />
      <LandingSocialProof logos={logos} title={`Featured on`} />
      <LandingPainPoints
        title={`61% of car buyers feel overwhelmed. Don't be one of them.`}
        painPoints={painPoints}
      />
      <LandingHowItWorks
        title={`Your Journey to the Perfect Car`}
        steps={steps}
      />
      <LandingFeatures
        id="features"
        title={`Discover How AutoWhisperer Simplifies Your Car-Buying Journey`}
        subtitle={`Our innovative features are designed to make finding your ideal vehicle effortless and enjoyable.`}
        features={features}
      />
      <LandingTestimonials
        title={`Real Stories from Satisfied Drivers`}
        subtitle={`See how AutoWhisperer has helped others find their perfect ride.`}
        testimonials={testimonials}
      />
      <LandingPricing
        id="pricing"
        title={`Choose the Plan That Fits Your Car-Buying Needs`}
        subtitle={`From casual browsers to serious shoppers, we have a package for everyone.`}
        packages={packages}
        onPackageSelect={handlePackageSelect}
      />
      <LandingFAQ
        id="faq"
        title={`Got Questions? We've Got Answers`}
        subtitle={`Learn more about how AutoWhisperer can revolutionize your car-buying experience.`}
        questionAnswers={questionAnswers}
      />
      <LandingCTA
        title={`Ready to Find Your Perfect Car?`}
        subtitle={`Join thousands of satisfied drivers who've discovered their ideal vehicle with AutoWhisperer.`}
        buttonText={`Start Your Journey`}
        buttonLink={`/register`}
      />
    </LandingContainer>
  )
}
