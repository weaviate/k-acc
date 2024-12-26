import Link from "next/link";
import Image from "next/image";

import { Product } from "@/types/products";

interface StackCardProps {
    products: Product[];
}

const StackCard: React.FC<StackCardProps> = ({ products }) => {
    return (
        <div>
            {products.map((product: Product) => (
                <div key={product.id}>
                    <h1>{product.name}</h1>
                </div>
            ))}
        </div>
    );
}