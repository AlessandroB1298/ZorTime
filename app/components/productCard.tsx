import { Card, CardContent } from "@/components/ui/card";
import { productType } from "@/lib/constants/products";
import Image from "next/image";
import placeholder from "../assets/placeholder.png";
export default function ProductCard({
  productTitle,
  productIcon: Icon,
  productImage,
  productDesc,
}: productType) {
  return (
    <div>
      <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-z-1 bg-background/80 backdrop-blur-sm border-secondary/60 hover:border-primary/50">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center gap-2 ">
              <div className="w-12 h-1 rounded-lg flex items-center justify-center ">
                <Icon className="w-6 h-6 text-primary mb-2" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                {productTitle}
              </h3>
            </div>
            <div className="flex items-center justify-center">
              <Image
                className="rounded-xl"
                width={300}
                height={300}
                src={placeholder}
                alt=""
              />
            </div>
            <div>
              <p className="text-foreground/80 leading-relaxed">
                {productDesc}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
