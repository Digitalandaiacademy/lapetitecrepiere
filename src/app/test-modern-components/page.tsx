import { ModernHero } from '@/components/modern-hero'
import { ModernNavbar } from '@/components/modern-navbar'
import { ModernFeaturedProducts } from '@/components/modern-featured-products'
import { ModernReviews } from '@/components/modern-reviews'

export default function TestModernComponents() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ModernNavbar />
      <ModernHero />
      <ModernFeaturedProducts />
      <ModernReviews />
    </div>
  )
}
