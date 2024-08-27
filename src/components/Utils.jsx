import { format, parse } from "date-fns";
import {
    Barbell,
    ShootingStar,
    PersonSimpleBike,
    PersonSimpleRun,
    PersonSimpleHike,
    PersonSimpleSwim,
    PersonSimpleTaiChi,
    Code,
    GameController,
    Checkerboard,
    ChefHat,
    CookingPot,
    ShoppingBag,
    Sailboat,
    Rocket,
    RocketLaunch,
    Alarm,
    Books,
    BookOpenText,
    Basketball,
    Football,
    SoccerBall,
    Golf,
    Fire,
    Racquet,
} from "@phosphor-icons/react";

export const formatDate = (date) => {
    const parsedDate = parse(date, new Date());

    if (isNaN(parsedDate.getTime())) {
        console.error("Invalid date:", dateString);
        return null;
    }

    return format(parsedDate, "MMMM d, yyyy");
};

// Map of string identifiers to the actual React icon components
export const iconMap = {
    // Fitness Icons
    barbell: <Barbell weight="fill" color="#eee" size="100%" />,
    personSimpleBike: <PersonSimpleBike weight="fill" color="#eee" size="100%" />,
    personSimpleRun: <PersonSimpleRun weight="fill" color="#eee" size="100%" />,
    personSimpleHike: <PersonSimpleHike weight="fill" color="#eee" size="100%" />,
    personSimpleSwim: <PersonSimpleSwim weight="fill" color="#eee" size="100%" />,
    personSimpleTaiChi: <PersonSimpleTaiChi weight="fill" color="#eee" size="100%" />,

    // Hobbies Icons
    gameController: <GameController weight="fill" color="#eee" size="100%" />,
    checkerboard: <Checkerboard weight="regular" color="#eee" size="100%" />,
    chefHat: <ChefHat weight="fill" color="#eee" size="100%" />,
    cookingPot: <CookingPot weight="fill" color="#eee" size="100%" />,
    sailboat: <Sailboat weight="fill" color="#eee" size="100%" />,

    // Sports Icons
    soccerBall: <SoccerBall weight="regular" color="#eee" size="100%" />,
    football: <Football weight="fill" color="#eee" size="100%" />,
    basketball: <Basketball weight="fill" color="#eee" size="100%" />,
    golf: <Golf weight="fill" color="#eee" size="100%" />,
    racquet: <Racquet weight="fill" color="#eee" size="100%" />,

    // Learning Icons
    books: <Books weight="fill" color="#eee" size="100%" />,
    bookOpenText: <BookOpenText weight="fill" color="#eee" size="100%" />,
    code: <Code weight="fill" color="#eee" size="100%" />,

    // Achievement Icons
    shootingStar: <ShootingStar weight="fill" color="#eee" size="100%" />,
    rocketLaunch: <RocketLaunch weight="fill" color="#eee" size="100%" />,
    fire: <Fire weight="fill" color="#eee" size="100%" />,
    alarm: <Alarm weight="fill" color="#eee" size="100%" />,
    shoppingBag: <ShoppingBag weight="fill" color="#eee" size="100%" />
};

