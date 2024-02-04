import { useState, useEffect } from "react";
import appleHealthKit, {
  HealthKitPermissions,
  HealthInputOptions,
  HealthValueOptions,
} from "react-native-health";

const permissions: HealthKitPermissions = {
  permissions: {
    read: [
      appleHealthKit.Constants.Permissions.Steps,
      appleHealthKit.Constants.Permissions.FlightsClimbed,
      appleHealthKit.Constants.Permissions.DistanceWalkingRunning,
    ],
    write: [
      appleHealthKit.Constants.Permissions.Steps,
      appleHealthKit.Constants.Permissions.FlightsClimbed,
      appleHealthKit.Constants.Permissions.DistanceWalkingRunning,
    ],
  },
};

export const useHealthData = (date: Date) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [steps, setSteps] = useState(0);
  const [fightsClimbed, setFlightsClimbed] = useState(0);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    appleHealthKit.initHealthKit(permissions, (error) => {
      if (error) {
        console.log(error);
        return;
      }
      setHasPermission(true);
      // You can request data
    });
  }, []);

  useEffect(() => {
    if (!hasPermission) {
      return;
    }

    const options: HealthInputOptions = {
      date: date.toISOString(),
      includeManuallyAdded: true,
      unit: appleHealthKit.Constants.Units.meter,
    };

    const saveStepsOptions: HealthValueOptions = {
      value: 250,
      unit: appleHealthKit.Constants.Units.count,
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    };

    for (let i = 1; i <= 10; i++) {
        const previousDate = new Date();
        const currentDate = new Date();
        previousDate.setDate(currentDate.getDate() - i);
        // console.log('Date to log data:- ', previousDate.toISOString());

        const randomSteps = Math.floor(Math.random() * 10000);
        const randomFlightsClimbed = Math.floor(Math.random() * 100);
        const randomDistance = Math.floor(Math.random() * 10000);
        const saveStepsOptions: HealthValueOptions = {
          value: randomSteps,
          unit: appleHealthKit.Constants.Units.count,
          startDate: previousDate.toISOString(),
          endDate: previousDate.toISOString(),
        }
        const saveFlightsClimbedOptions: HealthValueOptions = {
          value: randomFlightsClimbed,
          unit: appleHealthKit.Constants.Units.count,
          startDate: previousDate.toISOString(),
          endDate: previousDate.toISOString(),
        }
        const saveDistanceOptions: HealthValueOptions = {
          value: randomDistance,
          unit: appleHealthKit.Constants.Units.meter,
          startDate: previousDate.toISOString(),
          endDate: previousDate.toISOString(),
        }

        console.log('All options:- ', saveStepsOptions, saveDistanceOptions)

        // appleHealthKit.saveSteps(saveStepsOptions, (error, result) => {
        //     if (error) {
        //         console.log("Error save steps:- ", error);
        //         return;
        //     }
        //     console.log("Result save steps:- ", result);
        // })

        // appleHealthKit.saveWalkingRunningDistance(saveDistanceOptions, (error, result) => {
        //     if (error) {
        //         console.log("Error save distance:- ", error);
        //         return;
        //     }
        //     console.log("Result save distance:- ", result);
        // })

      }

    // appleHealthKit.saveSteps(saveStepsOptions, (error, result) => {
    //   if (error) {
    //     console.log("Error save steps:- ", error);
    //     return;
    //   }

    //   console.log("Result save steps:- ", result);
    // });

    appleHealthKit.getStepCount(options, (error, results) => {
      if (error) {
        console.log(error);
        return;
      }
      if (results) {
        setSteps(results.value);
      }
    });

    appleHealthKit.getFlightsClimbed(options, (error, result) => {
      if (error) {
        console.log("Effor fetching Flight Climbed: ", error);
      }

      if (result) {
        console.log(result.value);
        setFlightsClimbed(result.value);
      }
    });

    appleHealthKit.getDistanceWalkingRunning(options, (error, result) => {
      if (error) {
        console.log("Effor fetching Flight Climbed: ", error);
      }

      if (result) {
        console.log(result.value);
        setDistance(result.value);
      }
    });
  }, [hasPermission]);

  return {
    steps,
    fightsClimbed,
    distance,
  };
};
