import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode
  title: string
  desc: string
}) {
  return (
    <Card className="text-center shadow-none border-none">
      <CardHeader className="flex flex-col items-center">
        {icon}
        <CardTitle className="mt-2 text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{desc}</CardDescription>
      </CardContent>
    </Card>
  )
}