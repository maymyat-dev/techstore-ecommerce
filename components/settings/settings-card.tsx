import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type SettingCardProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
};

export function SettingCard({
  title,
  description,
  children,
}: SettingCardProps) {
  return (
    <Card className="w-full shadow-[0_0_15px_rgba(255,255,255,0.05)]">
  {title && (
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
  )}

  <CardContent>
    {children}
  </CardContent>
</Card>

  );
}
