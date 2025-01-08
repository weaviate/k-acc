import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SurveyAnswers, SurveyResults as Results } from "@/types/survey";
import { getSurveyResults } from "@/app/api";
import ProductCard from "../product/ProductCard";

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
      <div className="min-h-screen relative p-6">
        <div className="flex flex-col items-center justify-center gap-8 max-w-2xl mx-auto pt-20">
          <span className="loading loading-spinner loading-lg"></span>
          <p className="text-primary">Analyzing your responses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative p-6">
      <div className="flex flex-col items-center justify-center gap-8 max-w-2xl mx-auto pt-20">
        <h1 className="text-2xl text-primary text-center font-outfit">
          Your Personalized Results
        </h1>
        
        {results && (
          <>
            <p className="text-center text-primary">{results.text}</p>
            
            <div className="gap-6 mt-8">
            <h2 className="text-xl text-primary mb-4">Recommended Products</h2>
              <div className="flex flex-row gap-4">
                
                {/* Map through results.productsMain */}
                {results.productsMain.map((product) => (
                  <ProductCard key={product.product_id} product={product} />
                ))}
              </div>
              <div>
                <h2 className="text-xl text-primary mb-4">Additional Suggestions</h2>
                {/* Map through results.productsAdditional */}
              </div>
            </div>
          </>
        )}

        <button onClick={handleReset} className="btn btn-primary mt-8">
          Take Survey Again
        </button>
      </div>
    </div>
  );
};

export default SurveyResults;
