import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  LightbulbOutlined,
  CodeOutlined,
  ScienceOutlined,
  SchoolOutlined,
  ArrowForward
} from "@mui/icons-material";

const HomeSugg = () => {
  const suggestions = [
    {
      title: "The Science of Learning",
      description: "This book dives into how the brain learns, covering various techniques for improving retention and understanding.",
      icon: <ScienceOutlined fontSize="large" />,
      category: "Cognitive Science",
      color: "bg-indigo-100 text-indigo-800"
    },
    {
      title: "Mastering Programming",
      description: "A beginner's guide to programming, focusing on core concepts and practical coding techniques.",
      icon: <CodeOutlined fontSize="large" />,
      category: "Computer Science",
      color: "bg-blue-100 text-blue-800"
    },
    {
      title: "Data Science Essentials",
      description: "Learn about data science concepts, including data analysis, visualization, and machine learning.",
      icon: <LightbulbOutlined fontSize="large" />,
      category: "Data Science",
      color: "bg-purple-100 text-purple-800"
    },
    {
      title: "Modern Education Methods",
      description: "Explore innovative teaching techniques and learning strategies for the 21st century.",
      icon: <SchoolOutlined fontSize="large" />,
      category: "Education",
      color: "bg-teal-100 text-teal-800"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Book Suggestions
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover hand-picked recommendations to expand your knowledge and skills
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {suggestions.map((suggestion, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className={`h-full rounded-2xl overflow-hidden shadow-xl transition-all duration-300 group-hover:shadow-2xl ${suggestion.color.replace('bg-', 'bg-opacity-50 ')}`}>
                <div className="p-6 h-full flex flex-col">
                  <div className="mb-4 flex items-center">
                    <div className={`p-3 rounded-lg ${suggestion.color} mr-4`}>
                      {suggestion.icon}
                    </div>
                    <span className={`text-sm font-semibold ${suggestion.color}`}>
                      {suggestion.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {suggestion.title}
                  </h3>
                  <p className="text-gray-600 mb-6 flex-grow">
                    {suggestion.description}
                  </p>
                  <Link 
                    to="/suggest" 
                    className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
                  >
                    Learn more <ArrowForward className="ml-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <Link
            to="/suggest"
            className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
          >
            Submit Your Suggestion
            <LightbulbOutlined className="ml-2" />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HomeSugg;