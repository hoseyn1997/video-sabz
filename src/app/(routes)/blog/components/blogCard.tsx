"use client";
import { formatDate } from "date-fns";
import React from "react";

interface Props {
  blog: Blog;
}

const BlogCard = ({ blog }: Props) => {
  return (
    <div
      className={
        "rtl group relative mx-auto flex aspect-square bg-cover h-72  w-full md:w-11/12 flex-col rounded-2xl border border-neutral-100 bg-white hover:text-black md:h-72 dark:border-none p-1 opacity-60"
      }
      style={{ backgroundImage: `url('/assets/blog/${blog.photo}')` }}
    >
      <p className="absolute top-0 -left-2 z-10 w-fit bg-[#f2711c] blog_label text-xs px-3 py-1 rounded text-white">
        {blog.type}
      </p>
      <div className="absolute -top-1 left-0 right-0 mx-auto flex rounded-lg bg-gradient-to-b from-black to-[rgba(18,_18,_18,_0)] p-1 opacity-0 transition-all group-hover:top-0 group-hover:opacity-80 group-hover:duration-500">
        <div className="m-[2px] grid">
          <svg
            width="25px"
            height="25px"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 512 512"
            xmlSpace="preserve"
          >
            <circle style={{ fill: "#DB2B42" }} cx={256} cy={256} r={256} />
            <path
              style={{ fill: "#FFFFFF" }}
              d="M394.768,128.448H117.232C103.352,128.448,92,139.8,92,153.68v176.616
              c0,13.88,11.352,25.232,25.232,25.232h132.464l94.616,75.696v-75.696h50.464c13.88,0,25.232-11.352,25.232-25.232V153.68
              C420,139.8,408.648,128.448,394.768,128.448z"
            />
            <rect x="135.16" y="179.752" width="241.68" height="16.792" />
            <rect x="135.16" y={232} width="241.68" height="16.792" />
            <rect x="135.16" y="284.288" width="189.896" height="16.792" />
          </svg>
          <p className="sans_font m-[1px] bg-white/50 p-0.5 pt-1 text-center text-xs lg:text-sm">
            {blog.commentsCount}
          </p>
        </div>
        <div className="m-[2px] grid">
          <svg
            height="25px"
            width="25px"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 512 512"
            xmlSpace="preserve"
          >
            <path
              style={{ fill: "#FFE477" }}
              d="M488.727,186.182h-23.273H256H46.545H23.273C10.42,186.182,0,175.762,0,162.909v325.818
	C0,501.582,10.42,512,23.273,512H256h232.727C501.58,512,512,501.582,512,488.727V162.909
	C512,175.762,501.58,186.182,488.727,186.182z"
            />
            <path
              style={{ fill: "#6E76E5" }}
              d="M488.727,46.545H356.848h-23.273h-23.273H256h-54.303h-23.273h-23.273H23.273
	C10.42,46.545,0,56.965,0,69.818v93.091c0,12.853,10.42,23.273,23.273,23.273h23.273H256h209.455h23.273
	c12.853,0,23.273-10.42,23.273-23.273V69.818C512,56.965,501.58,46.545,488.727,46.545z"
            />
            <path
              style={{ fill: "#A78966" }}
              d="M356.848,46.545V23.273C356.848,10.42,346.428,0,333.576,0s-23.273,10.42-23.273,23.273v23.273
	h23.273H356.848z"
            />
            <path
              style={{ fill: "#806749" }}
              d="M201.697,46.545V23.273C201.697,10.42,191.277,0,178.424,0c-12.853,0-23.273,10.42-23.273,23.273
	v23.273h23.273H201.697z"
            />
            <path
              style={{ fill: "#DF6246" }}
              d="M318.791,246.691c-7.286,0-10.853,4.788-12.195,6.591c-0.047,0.062-0.093,0.124-0.137,0.188
	l-15.059,21.301c-2.589,2.78-5.007,7.405-5.007,11.697c0,8.158,6.383,14.794,14.23,14.794c0.625,0,1.246-0.045,1.854-0.135v88.458
	c0,8.114,6.689,14.232,15.557,14.232c8.718,0,15.548-6.251,15.548-14.232V260.731C333.585,252.858,327.086,246.691,318.791,246.691z
	"
            />
            <path
              style={{ fill: "#DD512A" }}
              d="M256,254.386c-0.828-0.569-1.694-1.1-2.583-1.606c-0.13-0.074-0.259-0.149-0.393-0.222
	c-0.88-0.487-1.787-0.95-2.726-1.376c-0.09-0.04-0.183-0.078-0.275-0.119c-0.915-0.408-1.856-0.787-2.824-1.136
	c-0.092-0.033-0.178-0.068-0.27-0.101c-0.991-0.351-2.014-0.664-3.058-0.954c-0.188-0.051-0.377-0.101-0.566-0.152
	c-1.055-0.278-2.13-0.531-3.24-0.748c-0.082-0.016-0.168-0.028-0.251-0.043c-1.055-0.2-2.138-0.368-3.241-0.51
	c-0.196-0.026-0.388-0.054-0.583-0.078c-1.136-0.135-2.298-0.239-3.482-0.315c-0.24-0.016-0.484-0.026-0.725-0.039
	c-1.23-0.065-2.476-0.109-3.755-0.109c-36.703,0-46.401,26.014-46.401,39.77c0,14.359,9.861,16.503,15.742,16.503
	c9.19,0,15.363-6.173,15.363-15.363c0-7.359,4.878-10.937,14.912-10.937c9.21,0,13.591,2.259,13.591,15.096
	c0,12.755-3.582,14.91-14.345,14.91c-8.003,0-14.04,6.361-14.04,14.795c0,8.464,5.984,14.608,14.23,14.608
	c15.475,0,17.56,8.017,17.56,15.858v3.598c0,13.723-5.028,19.07-17.937,19.07c-16.541,0-17.379-9.737-17.379-11.691
	c0-6.74-4.122-14.609-15.74-14.609c-9.643,0-15.172,5.807-15.172,15.934c0,19.645,16.989,40.524,48.476,40.524
	c1.289,0,2.549-0.045,3.793-0.11c0.299-0.016,0.597-0.033,0.894-0.053c1.237-0.081,2.456-0.182,3.646-0.326
	c0.022-0.003,0.042-0.006,0.067-0.009c1.179-0.144,2.33-0.33,3.463-0.537c0.245-0.045,0.492-0.09,0.737-0.138
	c1.154-0.227,2.292-0.475,3.395-0.765c0.009-0.002,0.016-0.005,0.025-0.006c1.103-0.292,2.175-0.622,3.23-0.976
	c0.185-0.062,0.366-0.123,0.549-0.186c2.136-0.745,4.167-1.621,6.085-2.624c0.135-0.07,0.27-0.138,0.403-0.209
	c0.968-0.518,1.911-1.064,2.824-1.648L256,254.386L256,254.386z"
            />
            <path
              style={{ fill: "#DF6246" }}
              d="M256,397.362c0.74-0.473,1.457-0.973,2.158-1.489c0.133-0.098,0.262-0.199,0.394-0.298
	c0.58-0.438,1.147-0.891,1.7-1.356c0.135-0.115,0.273-0.228,0.406-0.346c0.599-0.52,1.182-1.057,1.749-1.61
	c0.053-0.053,0.109-0.104,0.163-0.157c1.255-1.243,2.422-2.576,3.505-3.986c0.116-0.151,0.227-0.306,0.341-0.458
	c0.413-0.554,0.811-1.119,1.198-1.697c0.123-0.183,0.245-0.366,0.365-0.554c0.396-0.611,0.774-1.237,1.139-1.874
	c0.079-0.135,0.161-0.268,0.239-0.406c0.445-0.798,0.87-1.612,1.272-2.448c0.006-0.012,0.009-0.025,0.016-0.036
	c0.379-0.793,0.734-1.606,1.069-2.433c0.095-0.228,0.18-0.461,0.27-0.692c0.247-0.631,0.483-1.272,0.704-1.924
	c0.093-0.27,0.183-0.543,0.273-0.818c0.217-0.669,0.417-1.348,0.608-2.036c0.067-0.239,0.138-0.473,0.202-0.715
	c0.244-0.932,0.472-1.879,0.672-2.847c0.011-0.047,0.019-0.096,0.028-0.141c0.185-0.909,0.348-1.835,0.492-2.774
	c0.047-0.307,0.087-0.621,0.13-0.931c0.098-0.7,0.186-1.404,0.262-2.119c0.036-0.357,0.073-0.715,0.104-1.074
	c0.065-0.723,0.115-1.457,0.158-2.195c0.019-0.329,0.04-0.655,0.056-0.987c0.045-1.066,0.076-2.143,0.076-3.24v-3.598
	c0-13.315-4.498-24.21-12.905-31.763c5.904-7.63,9.124-18.268,9.124-30.866c0-0.932-0.025-1.848-0.061-2.752
	c-0.012-0.289-0.033-0.569-0.048-0.855c-0.036-0.614-0.074-1.226-0.126-1.826c-0.029-0.324-0.062-0.645-0.096-0.967
	c-0.057-0.559-0.121-1.112-0.194-1.659c-0.042-0.316-0.087-0.631-0.133-0.943c-0.085-0.56-0.18-1.112-0.282-1.659
	c-0.051-0.276-0.098-0.554-0.155-0.825c-0.133-0.659-0.281-1.306-0.438-1.946c-0.034-0.144-0.065-0.293-0.102-0.438
	c-0.203-0.791-0.425-1.569-0.666-2.33c-0.045-0.144-0.098-0.284-0.146-0.428c-0.197-0.605-0.405-1.202-0.627-1.789
	c-0.085-0.225-0.175-0.444-0.264-0.666c-0.2-0.501-0.406-0.996-0.624-1.482c-0.101-0.23-0.206-0.456-0.312-0.681
	c-0.227-0.479-0.461-0.95-0.703-1.415c-0.107-0.203-0.213-0.408-0.323-0.61c-0.282-0.514-0.576-1.016-0.878-1.511
	c-0.082-0.132-0.16-0.27-0.241-0.402c-0.801-1.266-1.673-2.468-2.614-3.604c-0.098-0.118-0.202-0.23-0.298-0.346
	c-0.375-0.439-0.759-0.87-1.154-1.289c-0.138-0.146-0.279-0.289-0.42-0.431c-0.377-0.385-0.763-0.762-1.159-1.128
	c-0.149-0.138-0.298-0.276-0.448-0.411c-0.424-0.379-0.86-0.745-1.303-1.103c-0.127-0.102-0.251-0.208-0.38-0.31
	c-0.574-0.451-1.164-0.887-1.772-1.305v142.978H256z"
            />
            <path
              style={{ fill: "#EEBF00" }}
              d="M253.176,399.009c-0.133,0.071-0.268,0.14-0.403,0.209c-1.919,1.002-3.949,1.879-6.085,2.624
	c-0.182,0.062-0.363,0.124-0.549,0.186c-1.055,0.354-2.127,0.686-3.23,0.976c-0.009,0.002-0.016,0.005-0.025,0.006
	c-1.103,0.289-2.239,0.538-3.395,0.765c-0.244,0.048-0.49,0.093-0.737,0.138c-1.134,0.206-2.285,0.393-3.463,0.537
	c-0.025,0.002-0.045,0.006-0.067,0.009c-1.19,0.144-2.409,0.247-3.646,0.326c-0.296,0.02-0.594,0.037-0.894,0.053
	c-1.246,0.065-2.504,0.11-3.793,0.11c-31.486,0-48.476-20.879-48.476-40.524c0-10.127,5.53-15.934,15.172-15.934
	c11.616,0,15.74,7.869,15.74,14.609c0,1.952,0.838,11.691,17.379,11.691c12.907,0,17.937-5.347,17.937-19.07v-3.598
	c0-7.841-2.087-15.858-17.56-15.858c-8.245,0-14.23-6.144-14.23-14.607c0-8.434,6.037-14.795,14.04-14.795
	c10.764,0,14.345-2.155,14.345-14.91c0-12.837-4.381-15.096-13.591-15.096c-10.035,0-14.912,3.578-14.912,10.937
	c0,9.19-6.173,15.363-15.363,15.363c-5.879,0-15.742-2.144-15.742-16.503c0-13.756,9.699-39.77,46.401-39.77
	c1.278,0,2.524,0.043,3.755,0.109c0.24,0.012,0.484,0.025,0.725,0.039c1.184,0.074,2.346,0.178,3.482,0.315
	c0.195,0.023,0.388,0.053,0.583,0.078c1.103,0.143,2.186,0.31,3.241,0.51c0.084,0.016,0.169,0.028,0.251,0.043
	c1.109,0.216,2.185,0.47,3.24,0.748c0.189,0.05,0.379,0.099,0.566,0.152c1.044,0.289,2.067,0.604,3.058,0.954
	c0.092,0.031,0.178,0.068,0.27,0.101c0.968,0.349,1.908,0.728,2.824,1.136c0.092,0.04,0.185,0.078,0.275,0.119
	c0.939,0.427,1.845,0.887,2.726,1.376c0.133,0.073,0.262,0.147,0.393,0.222c0.889,0.506,1.755,1.036,2.583,1.606v-68.208H46.545
	H23.273C10.42,186.182,0,175.762,0,162.909v325.818C0,501.582,10.42,512,23.273,512H256V397.362
	C255.088,397.947,254.144,398.491,253.176,399.009z"
            />
            <g>
              <path
                style={{ fill: "#D6D5D8" }}
                d="M228.031,246.883c1.278,0,2.524,0.043,3.755,0.109C230.555,246.927,229.309,246.883,228.031,246.883
		z"
              />
              <path
                style={{ fill: "#D6D5D8" }}
                d="M236.575,247.423c1.103,0.143,2.186,0.31,3.241,0.51
		C238.761,247.734,237.677,247.566,236.575,247.423z"
              />
              <path
                style={{ fill: "#D6D5D8" }}
                d="M232.508,247.031c1.184,0.076,2.346,0.178,3.482,0.315
		C234.854,247.211,233.692,247.107,232.508,247.031z"
              />
              <path
                style={{ fill: "#D6D5D8" }}
                d="M230.685,404.84c-1.246,0.065-2.504,0.11-3.793,0.11C228.18,404.949,229.44,404.905,230.685,404.84z
		"
              />
              <path
                style={{ fill: "#D6D5D8" }}
                d="M242.885,403.012c-1.103,0.29-2.239,0.538-3.395,0.765
		C240.646,403.551,241.782,403.301,242.885,403.012z"
              />
              <path
                style={{ fill: "#D6D5D8" }}
                d="M235.224,404.461c-1.19,0.144-2.41,0.247-3.646,0.326
		C232.816,404.707,234.035,404.606,235.224,404.461z"
              />
              <path
                style={{ fill: "#D6D5D8" }}
                d="M240.066,247.977c1.109,0.216,2.185,0.47,3.24,0.748
		C242.252,248.446,241.175,248.191,240.066,247.977z"
              />
              <path
                style={{ fill: "#D6D5D8" }}
                d="M238.755,403.914c-1.133,0.206-2.285,0.393-3.463,0.537
		C236.47,404.306,237.619,404.122,238.755,403.914z"
              />
              <path
                style={{ fill: "#D6D5D8" }}
                d="M243.873,248.875c1.044,0.289,2.067,0.604,3.058,0.954
		C245.94,249.479,244.916,249.164,243.873,248.875z"
              />
              <path
                style={{ fill: "#D6D5D8" }}
                d="M252.773,399.22c-1.918,1.002-3.949,1.879-6.085,2.624
		C248.824,401.099,250.854,400.223,252.773,399.22z"
              />
              <path
                style={{ fill: "#D6D5D8" }}
                d="M256,254.386L256,254.386c-0.828-0.569-1.694-1.1-2.583-1.606
		C254.306,253.286,255.171,253.817,256,254.386z"
              />
              <path
                style={{ fill: "#D6D5D8" }}
                d="M246.14,402.03c-1.055,0.354-2.127,0.684-3.23,0.976C244.011,402.716,245.085,402.384,246.14,402.03
		z"
              />
              <path
                style={{ fill: "#D6D5D8" }}
                d="M247.2,249.929c0.968,0.349,1.908,0.728,2.824,1.136C249.11,250.658,248.168,250.28,247.2,249.929z"
              />
              <path
                style={{ fill: "#D6D5D8" }}
                d="M250.298,251.184c0.939,0.427,1.845,0.887,2.726,1.376
		C252.144,252.072,251.237,251.611,250.298,251.184z"
              />
              <path
                style={{ fill: "#D6D5D8" }}
                d="M253.176,399.009c0.968-0.518,1.911-1.063,2.824-1.648l0,0
		C255.088,397.945,254.144,398.491,253.176,399.009z"
              />
            </g>
            <g>
              <path
                style={{ fill: "#DEDEE0" }}
                d="M262.406,392.263c-0.566,0.554-1.15,1.091-1.749,1.61
		C261.257,393.353,261.84,392.817,262.406,392.263z"
              />
              <path
                style={{ fill: "#DEDEE0" }}
                d="M266.074,388.121c-1.083,1.41-2.25,2.742-3.505,3.986
		C263.824,390.862,264.991,389.531,266.074,388.121z"
              />
              <path
                style={{ fill: "#DEDEE0" }}
                d="M260.251,394.218c-0.552,0.467-1.12,0.918-1.7,1.356
		C259.133,395.137,259.699,394.685,260.251,394.218z"
              />
              <path
                style={{ fill: "#DEDEE0" }}
                d="M267.613,385.966c-0.386,0.577-0.787,1.143-1.198,1.697
		C266.828,387.109,267.227,386.544,267.613,385.966z"
              />
              <path
                style={{ fill: "#DEDEE0" }}
                d="M257.772,255.691c-0.574-0.451-1.164-0.887-1.772-1.305l0,0
		C256.608,254.804,257.196,255.241,257.772,255.691z"
              />
              <path
                style={{ fill: "#DEDEE0" }}
                d="M256,397.362c0.74-0.473,1.457-0.973,2.158-1.489C257.457,396.389,256.74,396.888,256,397.362
		L256,397.362z"
              />
              <path
                style={{ fill: "#DEDEE0" }}
                d="M275.355,363.219c-0.076,0.715-0.163,1.42-0.262,2.119
		C275.191,364.639,275.279,363.934,275.355,363.219z"
              />
              <path
                style={{ fill: "#DEDEE0" }}
                d="M271.906,286.742c0.036,0.905,0.061,1.82,0.061,2.752
		C271.967,288.563,271.942,287.648,271.906,286.742z"
              />
              <path
                style={{ fill: "#DEDEE0" }}
                d="M268.895,271.076c0.223,0.585,0.43,1.184,0.627,1.789
		C269.324,272.26,269.115,271.663,268.895,271.076z"
              />
              <path
                style={{ fill: "#DEDEE0" }}
                d="M270.435,276.061c0.158,0.641,0.304,1.288,0.438,1.946
		C270.739,277.349,270.592,276.702,270.435,276.061z"
              />
              <path
                style={{ fill: "#DEDEE0" }}
                d="M269.667,273.293c0.239,0.762,0.462,1.539,0.666,2.33
		C270.128,274.832,269.906,274.055,269.667,273.293z"
              />
              <path
                style={{ fill: "#DEDEE0" }}
                d="M271.028,278.834c0.102,0.548,0.197,1.098,0.282,1.659
		C271.225,279.932,271.129,279.38,271.028,278.834z"
              />
              <path
                style={{ fill: "#DEDEE0" }}
                d="M271.732,284.061c0.051,0.602,0.092,1.212,0.126,1.826
		C271.822,285.272,271.784,284.663,271.732,284.061z"
              />
              <path
                style={{ fill: "#DEDEE0" }}
                d="M271.442,281.436c0.073,0.548,0.137,1.1,0.194,1.659
		C271.579,282.536,271.515,281.983,271.442,281.436z"
              />
              <path
                style={{ fill: "#DEDEE0" }}
                d="M269.118,383.539c-0.365,0.638-0.743,1.263-1.139,1.874
		C268.375,384.802,268.753,384.177,269.118,383.539z"
              />
              <path
                style={{ fill: "#DEDEE0" }}
                d="M268.006,268.93c0.219,0.486,0.424,0.981,0.624,1.482
		C268.431,269.911,268.224,269.416,268.006,268.93z"
              />
              <path
                style={{ fill: "#DEDEE0" }}
                d="M265.79,264.713c0.303,0.495,0.597,0.998,0.878,1.511
		C266.387,265.711,266.093,265.208,265.79,264.713z"
              />
              <path
                style={{ fill: "#DEDEE0" }}
                d="M262.935,260.709c0.942,1.136,1.814,2.337,2.614,3.604
		C264.749,263.045,263.875,261.845,262.935,260.709z"
              />
              <path
                style={{ fill: "#DEDEE0" }}
                d="M259.904,257.516c0.396,0.366,0.782,0.743,1.159,1.128
		C260.686,258.259,260.298,257.882,259.904,257.516z"
              />
              <path
                style={{ fill: "#DEDEE0" }}
                d="M266.991,266.834c0.242,0.464,0.476,0.936,0.703,1.415
		C267.467,267.768,267.233,267.298,266.991,266.834z"
              />
              <path
                style={{ fill: "#DEDEE0" }}
                d="M258.152,256.002c0.444,0.358,0.878,0.725,1.303,1.103
		C259.03,256.726,258.596,256.36,258.152,256.002z"
              />
              <path
                style={{ fill: "#DEDEE0" }}
                d="M261.482,259.074c0.396,0.419,0.779,0.849,1.154,1.289
		C262.26,259.924,261.877,259.492,261.482,259.074z"
              />
              <path
                style={{ fill: "#DEDEE0" }}
                d="M275.617,359.95c-0.042,0.74-0.093,1.472-0.158,2.195
		C275.524,361.421,275.574,360.688,275.617,359.95z"
              />
              <path
                style={{ fill: "#DEDEE0" }}
                d="M274.443,369.185c-0.2,0.968-0.427,1.915-0.672,2.847
		C274.015,371.099,274.243,370.153,274.443,369.185z"
              />
              <path
                style={{ fill: "#DEDEE0" }}
                d="M273.569,372.747c-0.191,0.687-0.391,1.367-0.608,2.036
		C273.178,374.114,273.379,373.434,273.569,372.747z"
              />
              <path
                style={{ fill: "#DEDEE0" }}
                d="M270.631,380.684c-0.402,0.838-0.827,1.651-1.272,2.448
		C269.802,382.337,270.229,381.522,270.631,380.684z"
              />
              <path
                style={{ fill: "#DEDEE0" }}
                d="M275.749,355.722c0,1.098-0.031,2.175-0.076,3.24C275.718,357.897,275.749,356.819,275.749,355.722z
		"
              />
              <path
                style={{ fill: "#DEDEE0" }}
                d="M274.963,366.269c-0.146,0.939-0.307,1.865-0.492,2.774
		C274.654,368.134,274.817,367.208,274.963,366.269z"
              />
              <path
                style={{ fill: "#DEDEE0" }}
                d="M272.69,375.6c-0.223,0.652-0.458,1.292-0.704,1.924C272.23,376.893,272.466,376.252,272.69,375.6z"
              />
              <path
                style={{ fill: "#DEDEE0" }}
                d="M271.715,378.216c-0.337,0.827-0.69,1.64-1.069,2.433
		C271.025,379.856,271.379,379.043,271.715,378.216z"
              />
            </g>
            <path
              style={{ fill: "#424EDE" }}
              d="M23.273,186.182h23.273H256V46.545h-54.303h-23.273h-23.273H23.273C10.42,46.545,0,56.965,0,69.818
	v93.091C0,175.762,10.42,186.182,23.273,186.182z"
            />
          </svg>
          <p className="sans_font m-[1px] bg-white/50 p-0.5 pt-1 text-center text-xs lg:text-sm">
            {blog.publishDate && formatDate(blog.publishDate, "yyyy-MM-dd")}
          </p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 rounded-md bg-gradient-to-t from-black to-[rgba(18,_18,_18,_0)] p-2 text-white shadow-[0_0_0_transparent]">
        <div className="flex cursor-pointer overflow-hidden p-1 opacity-0 transition-all duration-1000 group-hover:opacity-100">
          <img
            className="h-10 w-10 rounded-full"
            src={`/assets/${blog.hostImage}`}
            alt={blog.hostDisplayName}
          />

          <p className="m-1 my-1 rounded-2xl bg-red-400/70 p-1 text-white">
            {blog.category}
          </p>
        </div>

        <p className="sans_font -word-spacing-2 p-0 font-bold text-lg py-1 leading-[22px] text-white">
          {blog.title}
        </p>
        <p className="sans_font p-0 flex text-sm text-gray-400">
          {blog.summerizedDesc}
        </p>
      </div>
    </div>
  );
};

export default BlogCard;
