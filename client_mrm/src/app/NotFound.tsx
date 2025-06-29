import { Link } from "react-router-dom"
import notFoundImage from "@/assets/not-found.png" 

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 text-center">
      {/* Placeholder for your PNG image */}
      <img
        src={notFoundImage} // 🔁 Replace this with your actual image path
        alt="Not Found"
        className="w-64 h-64 object-contain mb-8"
      />

      <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-muted-foreground text-lg mb-6">
        The page you’re looking for doesn’t exist or was moved.
      </p>
      <Link
        to="/"
        className="px-6 py-3 rounded-xl text-white font-semibold bg-primary hover:bg-primary/90 transition-colors"
      >
        Go back home
      </Link>
    </div>
  )
}

export default NotFound
