import { Inter, Roboto } from "next/font/google";
import { CssBaseline, Toolbar } from "@mui/material";
import Navbar from "../components/global/navbar";
import { getCategories, getGlobalData } from "../utils";
import Providers from "../providers/providers";
import ThemeRegistry from "../theme/ThemeRegistry";
import Footer from "../components/global/footer";
import SnackbarProvider from "../providers/snackbarProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-roboto",
});

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
    <html
      lang="en"
      className={`${roboto.variable} ${inter.variable}`}
      style={{ fontFamily: "var(--font-roboto)" }}
    >
      <head></head>
      <body className={inter.className}>
        <Providers>
          <ThemeRegistry options={{ key: "mui" }}>
            <SnackbarProvider>
              <CssBaseline />
              <Navbar navData={navData} />
              <Toolbar />
              {children}
              <SpeedInsights />
              <Footer footerData={footerData} />
            </SnackbarProvider>
          </ThemeRegistry>
        </Providers>
      </body>
    </html>
  );
}
