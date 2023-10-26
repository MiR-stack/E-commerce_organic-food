import { Inter } from "next/font/google";
import { CssBaseline, Toolbar } from "@mui/material";
import Navbar from "../components/global/navbar";
import { getCategories, getGlobalData } from "../utils";
import Providers from "../store/providers";
import ThemeRegistry from "../theme/ThemeRegistry";
import Footer from "../components/global/footer";
import SnackbarProvider from "../components/utils/snackbarProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Unicron",
  description: "Unicorn product Shop",
};

export default async function RootLayout({ children }) {
  const globalData = await getGlobalData();
  const { navbar, footer, footer_links } = globalData.data.attributes;
  const categories = await getCategories("short");
  const navData = { navbar, categories };
  const footerData = { footer, footer_links };

  if (!globalData) {
    return <div>loading</div>;
  }

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <ThemeRegistry options={{ key: "mui" }}>
            <SnackbarProvider>
              <CssBaseline />
              <Navbar navData={navData} />
              <Toolbar />
              {children}
              <Footer footerData={footerData} />
            </SnackbarProvider>
          </ThemeRegistry>
        </Providers>
      </body>
    </html>
  );
}
