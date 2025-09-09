import { Button } from "@/components/ui/button"
import { Phone, Tablet, Wrench, ShieldCheck, Clock, LogOut } from "lucide-react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { ROUTES } from "@/constants/routes"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { logout } from "@/features/auth/store/authSlice"
import { ModeToggle } from "@/components/ModeToggle"
import { ServiceCard } from "../components/ServiceCard"
import { FeatureCard } from "../components/FeatureCard"
import { Navigation } from "@/components/layout/guest/Navigation"

export function HomePage() {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="w-full border-b shadow-sm">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <div className="text-2xl font-bold text-blue-600">
            <Link to="/">RepairHub</Link>
          </div>

          {/* Nav Menu */}
          <Navigation />
          {/* <NavigationMenu className="hidden md:block">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/">Home</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/services">Services</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/about">About Us</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/contact">Contact</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu> */}


          {/* Right Side (Auth Buttons) */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Button size="sm" asChild>
                  <Link to={ROUTES.DASHBOARD}>Dashboard</Link>
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => dispatch(logout())}
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <Button variant="outline" size="sm" asChild>
                <Link to={ROUTES.GUEST_PATHS.LOGIN}>Login</Link>
              </Button>
            )}
            <ModeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center text-center py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Fast & Reliable Mobile Repair Services
          </motion.h1>
          <motion.p
            className="text-lg max-w-2xl mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            We repair smartphones and tablets with expert care. Trusted by
            thousands of customers for quick, affordable, and guaranteed
            repairs.
          </motion.p>
          <Button size="lg" variant="default" >
            Book a Repair Now
          </Button>
        </section>

        {/* Services Section */}
        <section className="py-16 px-6 bg-gray-50">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
            <ServiceCard
              icon={<Phone className="h-12 w-12 text-blue-600" />}
              title="Smartphone Repairs"
              desc="Screen replacement, battery change, water damage repair and more."
            />
            <ServiceCard
              icon={<Tablet className="h-12 w-12 text-blue-600" />}
              title="Tablet Repairs"
              desc="Professional repair for all types of tablets including iPads."
            />
            <ServiceCard
              icon={<Wrench className="h-12 w-12 text-blue-600" />}
              title="Diagnostics & Support"
              desc="Free device diagnostics and expert support for any issues."
            />
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Us?
          </h2>
          <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
            <FeatureCard
              icon={<Clock className="h-10 w-10 text-blue-600" />}
              title="Quick Turnaround"
              desc="Most repairs done within the same day."
            />
            <FeatureCard
              icon={<ShieldCheck className="h-10 w-10 text-blue-600" />}
              title="Warranty Guaranteed"
              desc="All repairs backed by warranty."
            />
            <FeatureCard
              icon={<Wrench className="h-10 w-10 text-blue-600" />}
              title="Expert Technicians"
              desc="Trained and certified repair experts."
            />
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-6 bg-blue-600 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            Need Your Device Fixed Today?
          </h2>
          <p className="mb-6 max-w-xl mx-auto">
            Get your smartphone or tablet repaired quickly by trusted
            professionals.
          </p>
          <Button size="lg" variant="secondary">
            Contact Us
          </Button>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-muted-foreground border-t">
        © {new Date().getFullYear()} RepairHub. All rights reserved.
      </footer>
    </div>
  )
}