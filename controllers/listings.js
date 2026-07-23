const Listing=require("../models/listing");
const axios = require("axios");


module.exports.index=async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm=(req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing=async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id).populate({path: "reviews", populate: {path: "author"},}).populate("owner");
  if(!listing) {
    req.flash("error","Listing you requested does not exist!");
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
 const apiKey = process.env.OPENCAGE_API_KEY;

const geoResponse = await axios.get(
  "https://api.opencagedata.com/geocode/v1/json",
  {
    params: {
      q: req.body.listing.location,
      key: apiKey,
      limit: 1,
    },
  }
);

if (geoResponse.data.results.length === 0) {
  req.flash("error", "Location not found!");
  return res.redirect("/listings/new");
}

const result = geoResponse.data.results[0];


  let url=req.file.path;
  let filename=req.file.filename;

  const newListing=new Listing(req.body.listing);
  newListing.owner=req.user._id;
  newListing.image={url,filename};

  newListing.geometry = {
  type: "Point",
  coordinates: [result.geometry.lng, result.geometry.lat],
};

  let savedListing=await newListing.save();
  console.log(savedListing);
  req.flash("success","New Listing Created!");
  res.redirect("/listings");
}


module.exports.renderEditForm=async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
    if(!listing) {
    req.flash("error","Listing you requested does not exist!");
    return res.redirect("/listings");
  }

  let originalImageUrl = listing.image.url.includes("res.cloudinary.com")
  ? listing.image.url.replace("/upload/", "/upload/w_250/")
  : listing.image.url.replace(/w=\d+/, "w=250").replace(/h=\d+/, "h=166") + (!listing.image.url.includes("fit=") ? "&fit=crop" : "");

  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;

  const apiKey = process.env.OPENCAGE_API_KEY;

  const geoResponse = await axios.get(
    "https://api.opencagedata.com/geocode/v1/json",
    {
      params: {
        q: req.body.listing.location,
        key: apiKey,
        limit: 1,
      },
    }
  );

  if (geoResponse.data.results.length > 0) {
    const result = geoResponse.data.results[0];

    req.body.listing.geometry = {
      type: "Point",
      coordinates: [result.geometry.lng, result.geometry.lat],
    };
  }

  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};


module.exports.destroyListing=async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success","Listing Deleted!");
  res.redirect("/listings");
};