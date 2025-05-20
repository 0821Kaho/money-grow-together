import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft, Users, Briefcase, FileText, FileSearch, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useIsMobile } from "@/hooks/use-mobile";

const EnCompanyPage = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F5F5] to-white">
      {/* Sticky Header with blur effect */}
      <header className="sticky top-0 z-30 backdrop-blur-md bg-white/70 border-b border-gray-100/50">
        <div className="container mx-auto py-4 px-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <h1 className="text-2xl font-heading font-bold text-[#333333]">Pigipe</h1>
            </Link>
            <Link to="/" className="ml-auto flex items-center text-muted-foreground hover:text-primary transition-colors">
              <ChevronLeft className="h-4 w-4 mr-1" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* 1. Hero Section */}
        <section className="py-20 sm:py-24 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center relative">
            <div className="absolute inset-0 -z-10 bg-[#FFF8E1] opacity-30 blur-3xl rounded-full"></div>
            <motion.h1 
              className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Financial Literacy Creating<br className="sm:hidden" />
              <span className="text-primary">New Opportunities</span><br className="sm:hidden" />
              for Every Child and Adult.
            </motion.h1>
            <p className="font-body text-lg text-gray-700 max-w-2xl mx-auto mb-8">
              Bridging opportunity gaps through Edutainment × FinTech
            </p>
            <Link to="/">
              <Button size="lg" className="rounded-xl">
                View Services
              </Button>
            </Link>
          </div>
        </section>

        {/* Separator */}
        <div className="container mx-auto px-4">
          <hr className="border-t border-dashed border-gray-200 max-w-4xl mx-auto" />
        </div>

        {/* 2. Vision & Mission Section */}
        <section className="py-16 sm:py-24 container mx-auto px-4">
          <h2 className={`font-heading ${isMobile ? "text-2xl" : "text-3xl"} font-subheading text-center mb-12`}>Vision & Mission</h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white shadow-md rounded-2xl p-8 flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-heading text-xl font-subheading mb-3">Vision</h3>
              <p className="font-body text-gray-700">"Creating a world where financial barriers never limit dreams"</p>
            </div>
            
            <div className="bg-white shadow-md rounded-2xl p-8 flex flex-col items-center text-center">
              <div className="bg-secondary/10 p-3 rounded-full mb-4">
                <Users className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="font-heading text-xl font-subheading mb-3">Mission</h3>
              <p className="font-body text-gray-700">"Making financial education fun and accessible through research and technology"</p>
            </div>
          </div>
        </section>

        {/* 3. Business Domains Section */}
        <section className="py-16 sm:py-24 bg-[#F9F9F9]">
          <div className="container mx-auto px-4">
            <h2 className={`font-heading ${isMobile ? "text-2xl" : "text-3xl"} font-subheading text-center mb-12`}>Business Domains</h2>
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white shadow-md rounded-2xl p-6 space-y-4 h-full">
                <div className="bg-primary/10 p-3 inline-flex rounded-full mb-2">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-subheading">Edutainment × FinTech</h3>
                <p className="font-body text-gray-700 text-sm">
                  Development of research-based financial learning apps and games
                </p>
              </div>
              
              <div className="bg-white shadow-md rounded-2xl p-6 space-y-4 h-full">
                <div className="bg-secondary/10 p-3 inline-flex rounded-full mb-2">
                  <Briefcase className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="font-heading text-lg font-subheading">Marketing & PR Services</h3>
                <p className="font-body text-gray-700 text-sm">
                  Growth support for EdTech and FinTech startups
                </p>
              </div>
              
              <div className="bg-white shadow-md rounded-2xl p-6 space-y-4 h-full">
                <div className="bg-accent/10 p-3 inline-flex rounded-full mb-2">
                  <Briefcase className="h-6 w-6 text-accent-foreground" />
                </div>
                <h3 className="font-heading text-lg font-subheading">International Business Development</h3>
                <ul className="font-body text-gray-700 text-sm list-disc list-inside">
                  <li>Japan → Global: Market expansion support</li>
                  <li>Global → Japan: Sales assistance</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* 4. Company Profile Section */}
        <section className="py-16 sm:py-24 container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className={`font-heading ${isMobile ? "text-2xl" : "text-3xl"} font-subheading text-center mb-12`}>Company Profile</h2>
            <div className="bg-white shadow-md rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-[#F5F5F5] p-2 rounded-full">
                  <FileText className="h-5 w-5 text-gray-700" />
                </div>
                <h3 className="font-heading text-lg font-subheading">Company Overview</h3>
              </div>
              
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium w-32">Company</TableCell>
                    <TableCell>NextGens Co., Ltd.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Address</TableCell>
                    <TableCell>2-29-10 Kitamachi, Nerima-ku, Tokyo 176-0081</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Office</TableCell>
                    <TableCell>Kuwano Building 2F, 6-23-4 Jingumae, Shibuya-ku, Tokyo 150-0001</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Phone</TableCell>
                    <TableCell>03-6750-7041</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Email</TableCell>
                    <TableCell>
                      <a href="mailto:satoyoshi.kaho@outlook.jp" className="text-primary hover:underline">
                        satoyoshi.kaho@outlook.jp
                      </a>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Capital</TableCell>
                    <TableCell>4,000,000 JPY</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Founded</TableCell>
                    <TableCell>November 2024</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">CEO</TableCell>
                    <TableCell>Kaho Satoyoshi</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </section>

        {/* 5. Research & Development Section */}
        <section className="py-16 sm:py-24 bg-[#F9F9F9]">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className={`font-heading ${isMobile ? "text-2xl" : "text-3xl"} font-subheading text-center mb-12`}>Research & Development</h2>
              
              <div className="bg-white shadow-md rounded-2xl p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-secondary/10 p-2 rounded-full">
                    <FileSearch className="h-5 w-5 text-secondary" />
                  </div>
                  <h3 className="font-heading text-lg font-subheading">Research Themes and Progress</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="border-l-2 border-primary pl-4 ml-4 relative">
                    <div className="absolute w-3 h-3 rounded-full bg-primary -left-[6.5px] top-1.5"></div>
                    <h4 className="font-heading text-md font-subheading">2024 - Present</h4>
                    <p className="font-body text-gray-700 mt-2">
                      Joint research with Tohoku University Macroeconomics Professors<br />
                      "Identifying significant experiences/variables for expanding children's opportunities and income growth"
                    </p>
                  </div>
                  
                  <div className="border-l-2 border-gray-200 pl-4 ml-4 relative">
                    <div className="absolute w-3 h-3 rounded-full bg-gray-200 -left-[6.5px] top-1.5"></div>
                    <h4 className="font-heading text-md font-subheading">2025 - Planned</h4>
                    <p className="font-body text-gray-700 mt-2">
                      Implementation and evaluation of research findings<br />
                      Launch of collaborative projects with regional education boards
                    </p>
                  </div>
                </div>
                
                {/* Optional paper link */}
                <div className="mt-8 pt-4 border-t border-dashed border-gray-200">
                  <a 
                    href="#" 
                    className="inline-flex items-center text-primary hover:underline"
                    onClick={(e) => e.preventDefault()}
                  >
                    <FileSearch className="h-4 w-4 mr-2" />
                    <span>Papers & Research Results (Coming Soon)</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* 6. Partners Section */}
        <section className="py-16 sm:py-24 container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className={`font-heading ${isMobile ? "text-2xl" : "text-3xl"} font-subheading text-center mb-12`}>Partners</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center justify-center bg-white shadow-sm rounded-lg p-4 aspect-video">
                <div className="text-center font-heading text-gray-700">Tohoku University</div>
              </div>
              
              <div className="flex flex-col items-center justify-center bg-white shadow-sm rounded-lg p-4 aspect-video">
                <div className="text-center font-heading text-gray-700">Kyoto City</div>
              </div>
              
              <div className="flex flex-col items-center justify-center bg-white shadow-sm rounded-lg p-4 aspect-video">
                <div className="text-center font-heading text-gray-700">Kita Villa Papillon (Germany)</div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Contact CTA */}
        <section className="py-16 sm:py-24 bg-gradient-to-b from-[#FFF8E1] to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-6">
                Would you like to create the next opportunity<br className={isMobile ? "" : "hidden"} />
                with us?
              </h2>
              <p className="font-body text-gray-700 mb-8 max-w-lg mx-auto">
                Join us in our mission to expand possibilities for children who will lead our future.
                Please feel free to contact us.
              </p>
              <a 
                href="mailto:satoyoshi.kaho@outlook.jp"
                className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-heading hover:bg-primary/90 transition-colors"
              >
                <Mail className="h-5 w-5" />
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default EnCompanyPage;
