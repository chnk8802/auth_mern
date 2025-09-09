import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function ServiceCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode
  title: string
  desc: string
}) {
  return (
    <Card className="text-center">
      <CardHeader className="flex flex-col items-center">
        {icon}
        <CardTitle className="mt-2">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{desc}</CardDescription>
      </CardContent>
    </Card>
  )
}