// controllers/bannerController.js
const Banner = require('../models/Banner');

exports.createBanner = async (req, res) => {
  const { eventName, location } = req.body;
  const bannerImage = req.file ? req.file.filename : null;

  if (!bannerImage) return res.status(400).json({ msg: "Banner image is required" });

  try {
    const banner = await Banner.create({ eventName, location, bannerImage });
    res.status(201).json({ msg: "Banner created", banner });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getBanners = async (req, res) => {
  try {
    const banners = await Banner.find();
    res.status(200).json(banners);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findByIdAndDelete(req.params.id);
    if (!banner) return res.status(404).json({ msg: "Banner not found" });
    res.status(200).json({ msg: "Banner deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.updateBanner = async (req, res) => {
  const { eventName, location } = req.body;
  let bannerImage;

  if (req.file) {
    bannerImage = req.file.path.replace(/\\/g, '/'); // Normalize path
  }

  try {
    const updated = await Banner.findByIdAndUpdate(
      req.params.id,
      {
        ...(eventName && { eventName }),
        ...(location && { location }),
        ...(bannerImage && { bannerImage }),
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ msg: 'Banner not found' });

    res.status(200).json({ msg: 'Banner updated', banner: updated });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
