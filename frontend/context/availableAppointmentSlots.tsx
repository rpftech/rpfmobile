import React, {createContext, useCallback, useEffect, useState} from "react";
import Calendar from "../api/calendar";
import {MarkedAppointmentSlot} from "../api/calendar/types";

interface AvailableAppointmentSlotsResultsState {
    loading: boolean;
    error: boolean;
    data: MarkedAppointmentSlot[];
};

interface AvailableAppointmentSlotsResultsContext {
    availableAppointmentSlotsResults: AvailableAppointmentSlotsResultsState;
    setAvailableAppointmentSlotsResults: React.Dispatch<React.SetStateAction<AvailableAppointmentSlotsResultsState>>;
    fetchAvailableAppointmentSlots: () => void;
}

// type FetchAvailableAppointmentSlots = () => void;

export const AvailableAppointmentSlots = createContext<AvailableAppointmentSlotsResultsContext>(null);

const AvailableAppointmentSlotsProvider = ({ children }): JSX.Element => {
    const cache = new Map();
    const [availableAppointmentSlotsResults, setAvailableAppointmentSlotsResults] = useState<AvailableAppointmentSlotsResultsState>({
        loading: false,
        error: false,
        data: []
    });

    const fetchAvailableAppointmentSlots = useCallback(async () => {
        setAvailableAppointmentSlotsResults(state => ({
            ...state,
            loading: true,
            data: []
        }));
        const results = await Calendar.Appointments.getAvailableAppointmentSlots();
        // setAvailableAppointmentSlots(results.slice(0, 100));
        setAvailableAppointmentSlotsResults(state => ({
            ...state,
            loading: false,
            data: results.slice(0, 100)
        }));
        // console.log(results.slice(0, 100))
        // cache.set(availableAppointmentSlotsResults.data, results);
    }, []);

    useEffect(() => {
        fetchAvailableAppointmentSlots();
    }, []);

    return (
        <AvailableAppointmentSlots.Provider value={
            {
                availableAppointmentSlotsResults,
                setAvailableAppointmentSlotsResults,
                fetchAvailableAppointmentSlots
            }}>
            {children}
        </AvailableAppointmentSlots.Provider>
    );
};

export default AvailableAppointmentSlotsProvider;