import Image from "next/image";
import React from "react";
import { CiMenuKebab } from "react-icons/ci";
import { GrSettingsOption } from "react-icons/gr";

const Autha = () => {
  return (
    <div>
      <div className="flex">
        <div>
          <h1>Enter the number on your phone</h1>
          <p>
            Association du compte Whatsapp +237 676612446{" "}
            <a href="/autha" className="text-teal-600">
              (modify)
            </a>
          </p>
        </div>
        <div>
          <ol>
            <li>1. Open whatsapp on your phone</li>
            <li>
              2. Access the settings by clicking on the profil, Menu{" "}
              <CiMenuKebab /> or settings <GrSettingsOption />
            </li>
            <li>3. click on paired devices, next on pair device</li>
            <li>
              4. click on <br /> Connecter plutot avec un numero de telephone et
              saisissez ce code sur votre telephone
            </li>
          </ol>
        </div>
        <div></div>
      </div>

      <hr />
      <p>Link with a QR code</p>

      <div className="bg-gray-300">
        <h1>Tutorial</h1>
        <p>
          <a href="/help">Need hepl</a>
        </p>
        <Image src="/" width={400} height={300} alt="into_video" />
      </div>
    </div>
  );
};

export default Autha;
