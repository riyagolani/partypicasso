// Common utility function to format date
export const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric"
    });
};

// Common utility function to format time
export const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    const formattedHours = hours % 12 || 12; // Convert hours to 12-hour format
    const period = hours < 12 ? "AM" : "PM"; // Determine AM/PM
    return `${formattedHours}:${minutes} ${period}`;
};