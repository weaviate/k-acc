import { getProduct } from "@/app/api";
import ProductView from "@/components/product/ProductView";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);
  return <ProductView product={product} />;
}
