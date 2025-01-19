import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SurveyAnswers, SurveyResults as Results } from "@/types/survey";
import { getSurveyResults } from "@/app/api";
import ProductCardHorizontal from "../product/ProductCardHorizontal";

interface SurveyResultsProps {
  answers: SurveyAnswers;
  onReset: () => void;
}

const SurveyResults: React.FC<SurveyResultsProps> = ({ answers, onReset }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<Results | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        // Store answers in localStorage
        localStorage.setItem('surveyAnswers', JSON.stringify(answers));

        const userSurveyResults = await getSurveyResults(answers);
        setResults(userSurveyResults);
      } catch (error) {
        console.error('Error fetching results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [answers]);

  const handleReset = () => {
    localStorage.removeItem('surveyAnswers');
    onReset();
    router.push("/survey?q=0");
  };

  if (loading) {
    return (
      <div className="min-h-screen relative">
        <div className="flex flex-col items-center justify-center gap-8 max-w-2xl mx-auto pt-20">
          <span className="loading loading-spinner loading-lg"></span>
          <p className="text-primary">Analyzing your responses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative mb-10">
      <div className="flex flex-col items-center justify-center gap-4 max-w-6xl mx-auto pt-20">
        {/* <h1 className="text-2xl text-primary text-center font-outfit mb-8">
          Your Personalized Results
        </h1> */}

        {results && (
          <>
            <div className="flex flex-row gap-4">
              <div className="w-1/2">
                <h2 className="text-xl text-primary mb-4">Your Stack</h2>
                <div className="flex flex-col gap-4 mb-8 bg-secondary bg-opacity-50 p-8 rounded-md">
                  {Object.entries(results.productsMain).map(([key, product]) => (
                    <div key={product.product_id}>
                      <h3 className="text-lg text-accent mb-2 opacity-60">{key}</h3>
                      <ProductCardHorizontal product={product} />
                    </div>
                  ))}
                </div>
                <h2 className="text-lg text-primary mb-4">Additional Suggestions</h2>
                <div className="flex flex-col gap-4 bg-secondary bg-opacity-50 p-8 rounded-md">
                  {Object.entries(results.productsAdditional).map(([key, product]) => (
                    <div key={product.product_id}>
                      <h3 className="text-lg text-accent mb-2 opacity-60">{key}</h3>
                      <ProductCardHorizontal product={product} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-center gap-4 w-1/2 mt-10">
                <p className="text-center text-primary">{results.text}</p>
                <div className="w-full flex justify-center">
                  <button onClick={handleReset} className="btn btn-primary mt-8">
                    Take Survey Again
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SurveyResults;
