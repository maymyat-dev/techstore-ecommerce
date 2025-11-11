import {
  Card,
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
    <Card className="w-full">
      <CardHeader>
        {title && (
          <>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </>
        )}

        {children}
      </CardHeader>
    </Card>
  );
}
