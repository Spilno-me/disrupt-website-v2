import { PageLayout } from '@/components/layout/PageLayout'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

function Product() {
  return (
    <PageLayout>
      <div className="flex-grow bg-[#FBFBF3]">
        <div className="container mx-auto px-6 py-24 max-w-4xl">
          <div className="flex flex-col items-center text-center gap-8">
            <span className="inline-flex py-1 px-3 border border-[#2D3142] rounded-full text-sm font-medium text-[#2D3142]">Product</span>

            <h1 className="text-4xl lg:text-5xl font-display font-bold text-[#2D3142]">
              Coming Soon
            </h1>

            <p className="text-lg text-[#6B7280] max-w-2xl leading-relaxed">
              We're working hard to bring you detailed information about our AI-powered compliance platform.
              Stay tuned for updates on how Disrupt can transform your compliance workflow.
            </p>

            <Link to="/">
              <Button className="bg-[#2D3142] text-white hover:bg-[#2D3142]/90 rounded-lg px-6 py-2 gap-2">
                Back to Home
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

export default Product
