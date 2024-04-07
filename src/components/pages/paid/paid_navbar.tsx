import axios, { AxiosError } from "axios";
import React, { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";

const Paid_Navbar = () => {
  const [showPricing, setShowPricing] = useState(false);
  const [showContributionPopup, setShowContributionPopup] = useState(false);
  const [contributionName, setContributionName] = useState("");
  const [contributionDetail, setContributionDetail] = useState("");
  const [flyerImage, setFlyerImage] = useState("");

  const togglePricing = () => {
    setShowPricing(!showPricing);
  };

  const toggleContributionPopup = () => {
    setShowContributionPopup(!showContributionPopup);
  };

  const handleContributionNameChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setContributionName(e.target.value);
  };

  const handleContributionDetailChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setContributionDetail(e.target.value);
  };

  const convertToBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
  
      fileReader.onload = () => {
        const base64String = fileReader.result as string;
        if (typeof base64String === 'string') {
          resolve(base64String);
        } else {
          reject(new Error('Failed to convert file to base64'));
        }
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleImageFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 2 * 1024 * 1024) {
        alert("Image size should not exceed 2 MB");
        return;
      }
      const allowedFormats = ["image/jpeg","image/jpg", "image/png"]; 
      if (!allowedFormats.includes(selectedFile.type)) {
        alert("Image format should be either jpeg or png");
        return;
      }
      try {
        const base64String = await convertToBase64(selectedFile);
        setFlyerImage(base64String);
      } catch (error) {
        console.error('Error converting file to base64:', error);
      }
    }
  };

  const handleSubmitContribution = async () => {
    try {
      if (!flyerImage) {
        alert("Please select an image to upload");
        return;
      }
      if (!contributionName) {
        alert("Please specify Contribution Name");
        return;
      }
      if (!contributionDetail) {
        alert("Please specify Contribution Details");
        return;
      }

      console.log(flyerImage);

      const token = window.localStorage.getItem("token");
      if (!token) {
        throw new Error("no token supplied");
      }
      const contributionData = {
        name: contributionName,
        details: contributionDetail,
        image: flyerImage,
      };
      const response = await axios.post(
        "http://localhost:3000/api/v1/flyers/contributed/",
        contributionData,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      if (response.status === 201) {
        alert("Flyer Contributed Successfully!")
        setShowContributionPopup(false);
      } else {
        alert("Unable to create Contribution!")
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response && axiosError.response.status === 500) {
          alert("Internal Server Error")
        } else {
          alert("Something went wrong");
        }
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
    <nav className="bg-white shadow-md px-4 py-4 flex justify-between items-center">
      <div className="flex items-center">
        <span className="text-xl text-sky-500 font-bold mr-4">WherePromo</span>
      </div>

      <div className="flex space-x-4">
        <Link to="/" className="text-gray-700 hover:text-blue-500">
          Home
        </Link>
        <div
          className="text-gray-700 hover:text-blue-500"
          onClick={togglePricing}
        >
          Pricing
        </div>
        <Link to="/about" className="text-gray-700 hover:text-blue-500">
          About
        </Link>
        <Link to="/articles" className="text-gray-700 hover:text-blue-500">
          Articles
        </Link>
        <Link to="/maps" className="text-gray-700 hover:text-blue-500">
          Maps
        </Link>
      </div>

      <div>
        <button
          className="bg-blue-500 text-white font-bold rounded-2xl px-4 py-2 mr-4"
          onClick={toggleContributionPopup}
        >
          +
        </button>
        <button className="bg-blue-500 text-white font-bold rounded-2xl px-4 py-2">
          Logout
        </button>
      </div>

      {showPricing && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="flex flex-col items-center px-8 py-6 max-w-lg text-base bg-white rounded-3xl max-md:px-5 relative">
            <button
              className="absolute top-2 right-2 text-gray-600"
              onClick={togglePricing}
            >
              x
            </button>
            <div className="mt-2 text-2xl font-bold tracking-tighter text-sky-500 leading-[30px]">
              Get Premium Today!
            </div>
            <div className="mt-4 w-full text-base tracking-wider leading-6 text-stone-500">
              Join today to get some amazing features like:
            </div>
            <div className="flex flex-col px-4 mt-4 w-full">
              <div className="text-base tracking-wider leading-6 text-black">
                Advanced AI assistance
              </div>
              <div className="mt-2 text-base tracking-wider leading-6 text-black">
                Tailored Grocery Shop Lists
              </div>
              <div className="mt-2 text-base tracking-wider leading-6 text-black">
                User-Driven Contribution Rewards
              </div>
              <div className="flex justify-between mt-6 w-full">
                <div className="text-xl font-bold tracking-tighter text-right text-blue-500">
                  €9.90
                </div>
                <div className="text-lg tracking-wider text-gray-700">/mon</div>
              </div>
            </div>
            <div className="mt-6">
              <button className="bg-blue-500 text-white font-bold rounded-lg px-4 py-2">
                Get Premium
              </button>
            </div>
          </div>
        </div>
      )}

      {showContributionPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="flex flex-col items-center px-8 py-6 max-w-lg text-base bg-white rounded-3xl max-md:px-5 relative">
            <button
              className="absolute top-2 right-2 text-gray-600"
              onClick={toggleContributionPopup}
            >
              x
            </button>
            <div className="mt-2 text-2xl font-bold tracking-tighter text-sky-500 leading-[30px]">
              Add Contribution
            </div>
            <div className="mt-4 w-full">
              <input
                type="text"
                value={contributionName}
                onChange={handleContributionNameChange}
                placeholder="Contribution Name"
                className="border border-gray-300 rounded-md w-full px-3 py-2 mt-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="mt-4 w-full">
              <textarea
                value={contributionDetail}
                onChange={handleContributionDetailChange}
                placeholder="Contribution Detail"
                className="border border-gray-300 rounded-md w-full px-3 py-2 mt-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="mt-4 w-full">
              <input
                type="file"
                accept="image/jpeg,image/png,image/jpg"
                className="border border-gray-300 rounded-md w-full px-3 py-2 mt-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                onChange={handleImageFileChange}
              />
            </div>
            <div className="mt-6">
              <button
                className="bg-blue-500 text-white font-bold rounded-lg px-4 py-2"
                onClick={handleSubmitContribution}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Paid_Navbar;
