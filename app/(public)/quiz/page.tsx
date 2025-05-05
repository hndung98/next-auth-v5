import QuizGame from "@/components/quiz/quiz-game";
import quiz_geo from "@/content/quizzes/quiz_geo.json";
import quiz_math from "@/content/quizzes/quiz_math.json";
import quiz_nextjs from "@/content/quizzes/quiz_nextjs.json";

export default async function Page() {
  const data = [
    {
      name: "nextjs",
      questions: quiz_nextjs,
    },
    {
      name: "geography",
      questions: quiz_geo,
    },
    {
      name: "math",
      questions: quiz_math,
    },
  ];
  return (
    <>
      <div className="w-full flex-none md:w-64 justify-center items-center">
        <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
          <div className="hidden h-auto w-full grow rounded-md md:block text-center">
            {"Choose level..."}
          </div>
          <div className="hidden h-auto w-full grow rounded-md md:block text-center mt-6">
            {"Top 5 highest scores..."}
          </div>
          <div className="hidden h-auto w-full grow rounded-md md:block text-center mt-6">
            {"Advertising..."}
          </div>
          <div className="hidden h-auto w-full grow rounded-md md:block text-center mt-6">
            {"Something else..."}
          </div>
        </div>
      </div>
      <div className="flex-grow p-4 md:overflow-y-auto md:p-6 my-dark-style">
        <div className="p-4 text-center space-y-4">
          <h1>{"(Demo)"}</h1>
          <QuizGame data={data} />
        </div>
      </div>
    </>
  );
}
