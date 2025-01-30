"use client";

import Navbar from "@/components/ui/navbar";
import { RouterContext } from "../components/useRouter";
import { useContext, useEffect, useRef, useState } from "react";
import SubMenu from "../components/submenu";
import { Button } from "@/components/ui/button";
import { IoCaretBack } from "react-icons/io5";
import { getStack } from "./api";
import { Product, Stack, StackPayload } from "./types";
import ProductCard from "./product_card";
import { IoIosSunny } from "react-icons/io";
import { IoCloudyNightSharp } from "react-icons/io5";
import ProductDetails from "./product_details";
import { UserInformation } from "../types";
import Typewriter from "typewriter-effect";

export default function StackPage() {
  const { routeTo, userInformation, stack, updateStack } =
    useContext(RouterContext);

  const [loading, setLoading] = useState(false);

  const [currentStack, setCurrentStack] = useState<StackPayload | null>(null);

  const [initializedDescription, setInitializedDescription] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const hasFetchedRef = useRef(false);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeProductDetails = () => {
    setSelectedProduct(null);
  };

  const triggerStack = async (userInformation: UserInformation) => {
    if (loading || stack) {
      return;
    }
    console.log("triggerStack", loading, stack);
    setLoading(true);
    const newStack = await getStack(userInformation);
    updateStack(newStack);
    setCurrentStack(newStack);
    setLoading(false);
  };

  const triggerBackButton = () => {
    if (selectedProduct) {
      closeProductDetails();
    } else {
      routeTo("/questionnaire?summary=true");
    }
  };

  useEffect(() => {
    if (stack) {
      setCurrentStack(stack);
      return;
    }
    if (userInformation) {
      if (hasFetchedRef.current) return;
      hasFetchedRef.current = true;
      triggerStack(userInformation);
    } else {
      routeTo("/questionnaire");
    }
  }, [userInformation, hasFetchedRef, routeTo]);

  return (
    <div className="flex fade-in flex-col items-center flex-grow justify-start h-full gap-4 ">
      <Navbar>
        <Button size="icon" variant="outline" onClick={triggerBackButton}>
          <IoCaretBack size={24} />
        </Button>
        {loading ? (
          <p className="text-primary font-bold text-lg fade-in">
            Creating stack...
          </p>
        ) : (
          <p className="text-primary font-bold text-lg fade-in">
            {selectedProduct ? selectedProduct.category : "Your stack"}
          </p>
        )}
        <SubMenu />
      </Navbar>
      {loading && (
        <div className="w-full h-full items-center flex flex-col justify-center">
          <div className="loader">
            <div className="item1"></div>
            <div className="item2"></div>
            <div className="item3"></div>
          </div>
        </div>
      )}{" "}
      {currentStack && !loading && !selectedProduct && (
        <div className="flex flex-col items-start justify-start w-full h-full gap-4 overflow-y-scroll px-3">
          <div className="flex items-center gap-2">
            <IoIosSunny size={20} className="text-primary" />
            <p className="text-primary text-lg">Morning Routine</p>
          </div>
          <div className="flex flex-col w-full gap-2">
            <ProductCard
              onClick={handleProductClick}
              product={currentStack?.stack.cleanser}
              label="Cleanser"
            />
            <ProductCard
              onClick={handleProductClick}
              product={currentStack?.stack.moisturizer}
              label="Moisturizer"
            />
            <ProductCard
              onClick={handleProductClick}
              product={currentStack?.stack.sunscreen}
              label="Sunscreen"
            />
          </div>
          <div className="w-full flex flex-col gap-1">
            <p className="text-primary/80 text-xs font-bold">
              Why we picked this stack?
            </p>
            <p
              className="text-primary fade-down"
              dangerouslySetInnerHTML={{
                __html: currentStack?.description || "",
              }}
            />
          </div>
          <div className="flex items-center gap-2">
            <IoCloudyNightSharp size={20} className="text-primary" />
            <p className="text-primary/80 text-lg">Evening Routine</p>
          </div>
          <div className="flex flex-col w-full h-[100px] items-center justify-center gap-2 glass-card">
            <p>Log in to access more functions</p>
          </div>
        </div>
      )}
      {currentStack && selectedProduct && !loading && (
        <ProductDetails product={selectedProduct} label="Cleanser" />
      )}
    </div>
  );
}
