// const {title, subTitle, locationURL, type} = headerDetails;
export const movieHeaderList = [
    {
        title: "Trending",
        subTitle: "Hot movies",
        locationURL: "/browse/trending",
        type: "all",
    },
    {
        title: "Top Ratings",
        subTitle: "Highly rated movies",
        locationURL: "/search?s=rating-desc",
        type: "all",
    },
    {
        title: "New Releases",
        subTitle: "Just got uploaded",
        locationURL: "/search?s=date-desc",
        type: "all",
    },
    {
        title: "Random",
        subTitle: "Feeling lucky?",
        locationURL: "/browse/random",
        type: "random",
    }
]