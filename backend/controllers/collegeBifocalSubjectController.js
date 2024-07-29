import BifocalSubject from "../models/collegeBioFocalSubject.model.js";
// Create a new Bifocal Subject
export const createBifocalSubject = async (req, res) => {
    try {
        const newBifocalSubject = new BifocalSubject(req.body);
        const savedBifocalSubject = await newBifocalSubject.save();
        res.status(201).json(savedBifocalSubject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all Bifocal Subjects
export const getAllBifocalSubjects = async (req, res) => {
    try {
        const bifocalSubjects = await BifocalSubject.find();
        res.status(200).json(bifocalSubjects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single Bifocal Subject by ID
export const getBifocalSubjectById = async (req, res) => {
    try {
        const bifocalSubject = await BifocalSubject.findById(req.params.id);
        if (!bifocalSubject) return res.status(404).json({ message: 'Bifocal Subject not found' });
        res.status(200).json(bifocalSubject);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a Bifocal Subject by ID
export const updateBifocalSubject = async (req, res) => {
    try {
        const updatedBifocalSubject = await BifocalSubject.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBifocalSubject) return res.status(404).json({ message: 'Bifocal Subject not found' });
        res.status(200).json(updatedBifocalSubject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a Bifocal Subject by ID
export const deleteBifocalSubject = async (req, res) => {
    try {
        const deletedBifocalSubject = await BifocalSubject.findByIdAndDelete(req.params.id);
        if (!deletedBifocalSubject) return res.status(404).json({ message: 'Bifocal Subject not found' });
        res.status(200).json({ message: 'Bifocal Subject deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
