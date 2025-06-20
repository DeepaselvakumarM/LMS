



import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaGraduationCap, FaBook, FaUniversity, FaLaptopCode, FaRobot, FaShieldAlt } from "react-icons/fa";
import { GiMechanicalArm, GiElectricalResistance, GiPlantRoots, GiHealthNormal } from "react-icons/gi";

const Homepg = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const ugCourses = [
    { name: "BE Computer Science", icon: <FaLaptopCode className="mr-2" /> },
    { name: "BE Mechanical Engineering", icon: <GiMechanicalArm className="mr-2" /> },
    { name: "BTech Information Technology", icon: <FaBook className="mr-2" /> },
    { name: "BE Electrical Engineering", icon: <GiElectricalResistance className="mr-2" /> },
    { name: "BTech Agriculture Engineering", icon: <GiPlantRoots className="mr-2" /> },
    { name: "BE Biomedical Engineering", icon: <GiHealthNormal className="mr-2" /> },
    { name: "BE Cyber Security", icon: <FaShieldAlt className="mr-2" /> },
    { name: "BTech Artificial Intelligence and Engineering", icon: <FaRobot className="mr-2" /> }
  ];

  const pgCourses = [
    { name: "ME Industrial Safety Engineering", icon: <FaShieldAlt className="mr-2" /> },
    { name: "ME Computer Science and Engineering", icon: <FaLaptopCode className="mr-2" /> },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-800 mb-4">
            <FaUniversity className="inline-block mr-3" />
            Explore Our Courses
          </h1>
          <p className="text-lg text-indigo-600 max-w-2xl mx-auto">
            Discover our comprehensive range of undergraduate and postgraduate programs
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* UG Courses */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-xl shadow-xl overflow-hidden border border-indigo-100 transform hover:-translate-y-2 transition-transform duration-300"
          >
            <div className="bg-indigo-600 p-4">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <FaGraduationCap className="mr-3" />
                Undergraduate Programs
              </h2>
            </div>
            <div className="p-6">
              <ul className="space-y-4">
                {ugCourses.map((course, index) => (
                  <motion.li
                    key={index}
                    variants={itemVariants}
                    className="flex items-center p-3 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
                  >
                    <span className="text-indigo-600">{course.icon}</span>
                    <span className="text-gray-700 font-medium">{course.name}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* PG Courses */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-xl shadow-xl overflow-hidden border border-indigo-100 transform hover:-translate-y-2 transition-transform duration-300"
          >
            <div className="bg-indigo-800 p-4">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <FaGraduationCap className="mr-3" />
                Postgraduate Programs
              </h2>
            </div>
            <div className="p-6">
              <ul className="space-y-4">
                {pgCourses.map((course, index) => (
                  <motion.li
                    key={index}
                    variants={itemVariants}
                    className="flex items-center p-3 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
                  >
                    <span className="text-indigo-800">{course.icon}</span>
                    <span className="text-gray-700 font-medium">{course.name}</span>
                  </motion.li>
                ))}
              </ul>
              {/* <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-100"
              >
              
              </motion.div> */}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 text-center"
        >
        
        </motion.div>
      </div>
    </div>
  );
};

export default Homepg;