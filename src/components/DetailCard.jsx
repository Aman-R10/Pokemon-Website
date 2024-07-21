import React from "react";
import "./DetailCard.css";
import maleImage from "../assets/images/male.png";
import femaleImage from "../assets/images/female.png";
import bothImage from "../assets/images/both.png";
import noneImage from "../assets/images/none.png";

// Import generation images directly
import gen1Image from "../assets/generation/gen1.png";
import gen2Image from "../assets/generation/gen2.png";
import gen3Image from "../assets/generation/gen3.png";
import gen4Image from "../assets/generation/gen4.png";
import gen5Image from "../assets/generation/gen5.png";
import gen6Image from "../assets/generation/gen6.png";
import gen7Image from "../assets/generation/gen7.png";
import gen8Image from "../assets/generation/gen8.png";
import gen9Image from "../assets/generation/gen9.png";

// Map generation names to images
const generationImages = {
  'generation-i': gen1Image,
  'generation-ii': gen2Image,
  'generation-iii': gen3Image,
  'generation-iv': gen4Image,
  'generation-v': gen5Image,
  'generation-vi': gen6Image,
  'generation-vii': gen7Image,
  'generation-viii': gen8Image,
  'generation-ix': gen9Image,
};

const DetailCard = ({ title, data, isGender, isGeneration }) => {
  const renderGenderImage = (gender) => {
    switch (gender) {
      case "Male":
        return <img src={maleImage} alt="Male" className="gender-image" />;
      case "Female":
        return <img src={femaleImage} alt="Female" className="gender-image" />;
      case "Male, Female":
        return <img src={bothImage} alt="Both" className="gender-image" />;
      case "None":
      default:
        return <img src={noneImage} alt="None" className="gender-image" />;
    }
  };

  const renderGenerationImage = (generation) => {
    return <img src={generationImages[generation]} alt={generation} className="generation-image" />;
  };

  return (
    <div className="detail-card">
      <h4 className="detail-title">{title}</h4>
      {isGender ? renderGenderImage(data) : isGeneration ? renderGenerationImage(data) : <p className="detail-data">{data}</p>}
    </div>
  );
};

export default DetailCard;
