import "../public/globals.css";
import Index from "./index";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
const App = ({ Component, pageProps,  }: any) => {


  return (
    <QueryClientProvider client={queryClient}>
            <main className="mt-20 w-full p-8">
              <Component
                {...pageProps} // don't forget to pass the pageProps
              />
            </main>
            </QueryClientProvider>
  );
};

export default App;