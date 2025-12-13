"use client";
import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  featureName: string;
  featureDesc: string;
  featureIcon: LucideIcon;
}

export default function FeatureCard({
  featureName,
  featureDesc,
  featureIcon: Icon,
}: FeatureCardProps) {
  return (
    <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-background/80 backdrop-blur-sm border-secondary/60 hover:border-primary/50">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center border border-accent/30">
            <Icon className="w-6 h-6 text-secondary" />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-orimary">
              {featureName}
            </h3>
            <p className="text-foreground/80 leading-relaxed">{featureDesc}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
