import axios from "axios";

const API_BASE_URL = "http://localhost:8080";
const Token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlclR5cGUiOiJqb2JTZWVrZXIiLCJpYXQiOjE3MjMyOTY4MTMsImV4cCI6MTcyMzMwMDQxM30.OizjjbvMZ2RODgLKMhhRu-iwiCNNFWfZTs9hBOLaud4";

// Function to create a new job posting
const createJobPosting = async () => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/create-posting`,
      {
        title: "Software Engineer",
        description: "We are looking for a Software Engineer.",
        responsibilities: ["Develop software", "Write tests", "Document code"],
        requirements: [
          "Bachelor's degree in Computer Science",
          "2+ years of experience",
          "Must speak Mon Langauge",
          "Be good in communications",
          "Text 1",
          "TExt 2",
        ],
        salary: "100000",
        location: "San Francisco, CA",
        address: "123 Market Street",
      },
      {
        headers: {
          Authorization: `Bearer ${Token}`, // Replace YOUR_TOKEN_HERE with a valid token
        },
      }
    );

    console.log("Create Job Posting Response:", response.data);
    return response.data.id;
  } catch (error) {
    console.error(
      "Error creating job posting:",
      error.response ? error.response.data : error.message
    );
  }
};

// Function to get all job postings
const getAllJobPostings = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/allposting`);
    console.log("All Job Postings:", response.data);
  } catch (error) {
    console.error(
      "Error getting all job postings:",
      error.response ? error.response.data : error.message
    );
  }
};

// Function to get a job posting by ID
const getJobPostingById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/post/${id}`);
    console.log(`Job Posting with ID ${id}:`, response.data);
  } catch (error) {
    console.error(
      `Error getting job posting with ID ${id}:`,
      error.response ? error.response.data : error.message
    );
  }
};

// Function to update a job posting by ID
const updateJobPostingById = async (id) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/post/${id}`,
      {
        title: "Updated Software Engineer",
        description: "Updated description.",
        responsibilities: ["Updated responsibility"],
        requirements: ["Updated requirement"],
        salary: "120000",
        location: "New York, NY",
        address: "456 Park Avenue",
      },
      {
        headers: {
          Authorization: `Bearer ${Token}`, // Replace YOUR_TOKEN_HERE with a valid token
        },
      }
    );

    console.log(`Update Job Posting with ID ${id} Response:`, response.data);
  } catch (error) {
    console.error(
      `Error updating job posting with ID ${id}:`,
      error.response ? error.response.data : error.message
    );
  }
};

// Function to delete a job posting by ID
const deleteJobPostingById = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/post/${id}`, {
      headers: {
        Authorization: `Bearer ${Token}`, // Replace YOUR_TOKEN_HERE with a valid token
      },
    });

    console.log(`Delete Job Posting with ID ${id} Response:`, response.data);
  } catch (error) {
    console.error(
      `Error deleting job posting with ID ${id}:`,
      error.response ? error.response.data : error.message
    );
  }
};

// Main function to run the tests
const runTests = async () => {
  // Create a new job posting
  const jobId = await createJobPosting();

  // Get all job postings
  //   await getAllJobPostings();

  // Get the job posting by ID
  if (jobId) {
    await getJobPostingById(jobId);

    // Update the job posting by ID
    // await updateJobPostingById(jobId);

    // Delete the job posting by ID
    // await deleteJobPostingById(jobId);
  }
};

runTests();
