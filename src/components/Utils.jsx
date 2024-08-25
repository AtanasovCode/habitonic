import { format, parse } from "date-fns";

export const formatDate = (date) => {
    const parsedDate = parse(date, new Date());
    
    if (isNaN(parsedDate.getTime())) {
        console.error("Invalid date:", dateString);
        return null;
    }

    return format(parsedDate, "MMMM d, yyyy");
};

