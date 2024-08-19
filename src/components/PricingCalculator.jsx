import { useEffect, useState } from "react";

const PricingCalculator = () => {
  // Dropdowns
  const [location, setLocation] = useState("");
  const [service, setService] = useState("");
  const [channel, setChannel] = useState("");
  const [social, setSocial] = useState("");

  // Range with default values
  const [visitors, setVisitors] = useState(1500); // Default 1500 visitors
  const [conversion, setConversion] = useState(2); // Default 2% conversion rate

  // Calculated results
  const [coursePrice, setCoursePrice] = useState(null); // Initialize as null
  const [coachingFees, setCoachingFees] = useState(null); // Initialize as null
  const [estimatePrice, setEstimatePrice] = useState(null); // Initialize as null

  // Displayed values with count-up animation
  const [displayedCoursePrice, setDisplayedCoursePrice] = useState(0);
  const [displayedCoachingFees, setDisplayedCoachingFees] = useState(0);
  const [displayedEstimatePrice, setDisplayedEstimatePrice] = useState(0);

  // Function to calculate course price
  const calculateCoursePrice = () => {
    if (location && service && channel && social) {
      const locationValue = Number(location);
      const serviceValue = Number(service);
      const channelValue = Number(channel);
      const socialValue = Number(social);

      const coursePrice =
        locationValue * serviceValue * channelValue * 100 * socialValue;
      setCoursePrice(coursePrice);

      const coachingFees =
        locationValue * serviceValue * channelValue * 100 * socialValue * 5;
      setCoachingFees(coachingFees);
    } else {
      setCoursePrice(null); // Reset to null if not all fields are selected
      setCoachingFees(null); // Reset to null if not all fields are selected
    }
  };

  const calculateEstimatePrice = () => {
    if (coursePrice && visitors && conversion) {
      const price = coursePrice * visitors * conversion;
      setEstimatePrice(price);
    } else {
      setEstimatePrice(null);
    }
  };

// Function to animate values with specific increments: 1 to 100, then 200, then 400
const animateValue = (start, end, setter) => {
  const duration = 1000; // Animation duration in ms (1 second)
  let current = start;
  let increment;

  const stepTime = duration / 100; // Base step time for the initial increments

  const timer = setInterval(() => {
    // Determine the increment based on the current value
    if (current < 100) {
      increment = 1;
    } else if (current < 200) {
      increment = 100;
    } else if (current < 400) {
      increment = 200;
    } else {
      increment = end - current; // Final jump to the exact end value
    }

    current += increment;
    if (current >= end) {
      current = end; // Ensure it exactly reaches the end value
      setter(current);
      clearInterval(timer);
    } else {
      setter(current);
    }
  }, Math.max(stepTime, 1)); // Ensure stepTime is at least 1ms
};



  // Recalculate the course price whenever any input changes
  useEffect(() => {
    calculateCoursePrice();
  }, [location, service, channel, social]);

  // Recalculate the estimated price whenever relevant inputs change
  useEffect(() => {
    calculateEstimatePrice();
  }, [conversion, coursePrice, visitors]);

  // Animate the display of course price, coaching fees, and estimate price
  useEffect(() => {
    if (coursePrice !== null) {
      animateValue(displayedCoursePrice, Math.round(coursePrice), setDisplayedCoursePrice);
    }
    if (coachingFees !== null) {
      animateValue(displayedCoachingFees, Math.round(coachingFees), setDisplayedCoachingFees);
    }
    if (estimatePrice !== null) {

      animateValue(displayedEstimatePrice, Math.round(estimatePrice), setDisplayedEstimatePrice);
    }
  }, [coursePrice, coachingFees, estimatePrice]);

  return (
    <div className="pricingCalculator">
      <div className="left">
        <div className="inputGroup">
          <label htmlFor="Location">Location</label>
          <select
            value={location}
            id="Location"
            onChange={(e) => setLocation(e.target.value)}
          >
            <option disabled value="">
              Select Value
            </option>
            <option value="3">North America</option>
            <option value="1">South America</option>
            <option value="1.5">Western America</option>
          </select>
        </div>

        <div className="inputGroup">
          <label htmlFor="Services">Dropdown</label>
          <select
            value={service}
            id="Services"
            onChange={(e) => setService(e.target.value)}
          >
            <option disabled value="">
              Select Value
            </option>
            <option value="1.5">Design</option>
            <option value="2">Development</option>
            <option value="1.7">Marketing</option>
            <option value="2.2">Software and Tech</option>
            <option value="1.2">Self Development</option>
            <option value="1.7">Business</option>
            <option value="1.3">Photography</option>
            <option value="0.7">Music</option>
          </select>
        </div>

        <div className="inputGroup">
          <label htmlFor="Channel">Main Acquisition Channel</label>
          <select
            value={channel}
            id="Channel"
            onChange={(e) => setChannel(e.target.value)}
          >
            <option disabled value="">
              Select Value
            </option>
            <option value="0.65">Content Creation (Organic)</option>
            <option value="1">Paid Ads</option>
          </select>
        </div>

        <div className="inputGroup">
          <label htmlFor="Social">Social trust</label>
          <select
            value={social}
            id="Social"
            onChange={(e) => setSocial(e.target.value)}
          >
            <option disabled value="">
              Select Value
            </option>
            <option value="0.7">Low</option>
            <option value="1">Medium</option>
            <option value="1.5">High</option>
          </select>
        </div>

        <div className="progressGroup">
          <h3>Revenue Estimation</h3>

          <div className="visitor">
            <div className="label">
              <label htmlFor="visitor">Website Visitor (Monthly) </label>
              <input
                value={visitors}
                type="text"
                onChange={(e) => setVisitors(e.target.value)}
              />
            </div>
            <input
              value={visitors}
              type="range"
              min={0}
              max={25000}
              onChange={(e) => setVisitors(e.target.value)}
            />
            <div className="minMaxNumber">
              <span>0</span>
              <span>25,000</span>
            </div>
          </div>

          <div className="conversionRate">
            <div className="label">
              <label htmlFor="conversion">Conversion Rate (%) </label>
              <input
                type="text"
                value={conversion}
                onChange={(e) => setConversion(e.target.value)}
              />
            </div>
            <input
              value={conversion}
              type="range"
              min={0.5}
              max={5}
              step="0.1"
              onChange={(e) => setConversion(e.target.value)}
            />
            <div className="minMaxNumber">
              <span>0%</span>
              <span>5%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="right">
        <div className="box">
          <h4>Course Price</h4>
          <span>{coursePrice !== null ? `$${displayedCoursePrice}` : "--"}</span>
          <i>Estimate the price of your course based on competitor analysis.</i>
        </div>
        <hr />
        <div className="box">
          <h4>Coaching Fees (Monthly) </h4>
          <span>{coachingFees !== null ? `$${displayedCoachingFees}` : "--"}</span>
          <i>The monthly fees for one-on-one coaching sessions.</i>
        </div>
        <hr />
        <div className="box">
          <div className="boxLeft">
            <h4>Estimated Revenue (Monthly) </h4>
            <i>
              Calculate the total revenue generated from your website per month.
            </i>
          </div>
          <span>{estimatePrice !== null ? `$${displayedEstimatePrice}` : "--"}</span>
        </div>

        <div className="call">
          <h2>Turn Numbers into Reality</h2>
          <i>
            Want to estimate the potential revenue of your course or coaching
            program? Discuss with us!
          </i>

          <button>Book Your Strategy Call</button>
        </div>
      </div>
    </div>
  );
};

export default PricingCalculator;
