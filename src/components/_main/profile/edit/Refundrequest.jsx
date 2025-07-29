import React, { useState, useRef } from 'react';
import {
  Card,
  Typography,
  Box,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link,
  TextField,
  Grid,
  Stack,
  Paper,
  Button
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// Removed RadioButtonUncheckedIcon as CheckCircleIcon will be used for both states with color changes

// Main Refund Request UI Component
export default function App() {
  const [expanded, setExpanded] = useState('panel1');
  const [selectedImages, setSelectedImages] = useState(['', '']); // Two empty slots for images

  const fileInputRef = useRef(null); // Ref for the hidden file input
  const [currentImageIndex, setCurrentImageIndex] = useState(null); // Track which image slot was clicked

  // Handles Accordion expansion/collapse
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // Triggers the hidden file input when an image box is clicked
  const handleImageClick = (index) => {
    setCurrentImageIndex(index); // Save the index of the clicked slot
    fileInputRef.current.click(); // Programmatically click the hidden file input
  };

  // Handles file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the first selected file
    if (file && currentImageIndex !== null) {
      const reader = new FileReader(); // Create a FileReader object
      reader.onload = (e) => {
        const newImages = [...selectedImages]; // Create a copy of the existing images array
        newImages[currentImageIndex] = e.target.result; // Update the specific slot with the new image Data URL
        setSelectedImages(newImages); // Set the updated array to state
        setCurrentImageIndex(null); // Reset the index
      };
      reader.readAsDataURL(file); // Read the file as a Data URL (base64 string)
    }
    // Clear the file input value so the same file can be selected again if needed
    event.target.value = null;
  };

  // State for tracking progress
  const [activeStep, setActiveStep] = useState(1); // Initially 'Out for Delivery' is active

  const steps = [
    { name: 'Shipped', id: 0 },
    { name: 'Out for Delivery', id: 1 },
    { name: 'Delivered', id: 2 }
  ];

  // Function to handle clicking on a step, updating the active step
  const handleStepClick = (id) => {
    setActiveStep(id);
  };

  return (
    <div className="flex justify-center p-4 min-h-screen bg-gray-100">
      <Card
        sx={{
          marginTop: '50px',
          padding: '20px',
          borderRadius: '8px',
          width: '100%',
          maxWidth: '800px', // Max-width for better readability on larger screens
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' // Subtle shadow for the main card
        }}
      >
        {/* Header Section: Refund Request # and Status Chip */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <Typography
            variant="h5"
            component="h2"
            sx={{ fontWeight: 'bold', color: '#333', fontSize: { xs: '1.2rem', sm: '1.5rem' } }}
          >
            Refund Request #RR-34297
          </Typography>
          <Chip
            label="Under Review"
            sx={{
              backgroundColor: '#FECDCA',
              color: 'black',
              fontWeight: 'medium',
              fontSize: { xs: '0.7rem', sm: '0.8rem' },
              padding: '7px 8px',
              height: 'auto',
              borderRadius: '16px'
            }}
          />
        </Box>

        {/* Submission Date */}
        <Typography
          variant="body2"
          sx={{ color: '#555', marginBottom: '20px', marginTop: '-10px', fontSize: { xs: '0.75rem', sm: '0.8rem' } }}
        >
          Submitted on: April 30, 2025 at 2:45 PM (ET)
        </Typography>

        {/* Info/Alert Card */}
        <Card
          sx={{
            backgroundColor: '#FFF0EF',
            border: '1px solid #FFCC80',
            display: 'flex',
            alignItems: 'flex-start', // Align icon and text to the start
            borderRadius: '12px',
            boxShadow: 'none',
            padding: { xs: '10px', sm: '15px' }, // Responsive padding
            marginBottom: '30px' // Spacing before accordions
          }}
        >
          <InfoOutlinedIcon
            sx={{ color: '#718096', marginRight: '10px', fontSize: { xs: '18px', sm: '20px' }, marginTop: '2px' }}
          />
          <Typography
            variant="body2"
            sx={{ color: '#0B1C13', lineHeight: 1.4, fontSize: { xs: '0.8rem', sm: '0.8rem' } }}
          >
            We need additional information to proceed with your request.
            <br />
            Please upload a clearer photo of the item or add more details{' '}
            <Link href="#" sx={{ color: '#0B1C13', cursor: 'pointer', textDecoration: 'underline' }}>
              click here to provide additional information
            </Link>
          </Typography>
        </Card>

        {/* Toggle functionality section (Accordions) */}
        <Box sx={{ width: '100%' }}>
          {/* Customer Request Info Accordion */}
          <Accordion
            expanded={expanded === 'panel1'}
            onChange={handleChange('panel1')}
            sx={{
              borderRadius: '8px',
              marginBottom: '10px',
              boxShadow: 'none',
              '&:before': { display: 'none' } // Remove default accordion line
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              sx={{
                backgroundColor: '#F7FAFC',
                borderRadius: '8px',
                minHeight: '48px', // Consistent height
                '&.Mui-expanded': {
                  minHeight: '48px'
                },
                '.MuiAccordionSummary-content, Mui-expanded': {
                  margin: '12px 0'
                }
              }}
            >
              <Typography sx={{ fontWeight: 'medium', fontSize: { xs: '0.9rem', sm: '1rem' } }} >
                Customer Request Info
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: '16px', borderTop: '1px solid #e0e0e0' }}>
              <Grid container spacing={2} alignItems="flex-start">
                {/* Reason for Refund */}
                <Grid item xs={12} sm={12} md={12}>
                  <Box display="flex" alignItems="center" gap="20px">
                    <Typography variant="subtitle2" sx={{ color: '#555', minWidth: '150px', mt: 1, fontSize: '12px' }}>
                      Reason for Refund:
                    </Typography>
                    <TextField
                      fullWidth
                      value="Received damaged item"
                      InputProps={{ readOnly: true }} // Make TextField read-only
                      variant="outlined"
                      size="small"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '50px', // Border radius 50px
                          backgroundColor: '#f5f5f5' // Light grey background
                        },
                        '& .MuiInputBase-input': {
                          padding: '8px 12px', // Adjust padding for small size
                          fontSize: '12px' // Font size 12px
                        }
                      }}
                    />
                  </Box>
                </Grid>
                {/* Additional Comments */}
                <Grid item xs={12} sm={12} md={12}>
                  <Box display="flex" alignItems="flex-start" gap="20px">
                    <Typography variant="subtitle2" sx={{ color: '#555', minWidth: '150px', mt: 1, fontSize: '12px' }}>
                      Additional Comments:
                    </Typography>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      value="When I opened the box, the jar was cracked and leaking. It was packaged with minimal padding, and the lid was loose. I'm unable to use this product and would like a refund."
                      InputProps={{ readOnly: true }}
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px', // Border radius 12px
                          backgroundColor: '#f5f5f5',
                          maxHeight: '90px'
                        },
                        '& .MuiInputBase-input': {
                          fontSize: '12px' // Font size 12px
                        }
                      }}
                    />
                  </Box>
                </Grid>
                {/* Dynamic Image Slots */}
                <Grid item xs={12} sm={12} md={12}>
                  <Box display="flex" gap="7px">
                    <Typography variant="subtitle2" sx={{ color: '#555', minWidth: '150px', mt: 1, fontSize: '12px' }}>
                      Uploaded Images:
                    </Typography>
                    <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
                      {/* Hidden file input */}
                      <input
                        type="file"
                        accept="image/*" // Allow only image files
                        ref={fileInputRef} // Link this input to the ref
                        onChange={handleFileChange} // Call handleFileChange when files are selected
                        style={{ display: 'none' }} // Hide this input visually
                      />

                      {selectedImages.map((imageSrc, index) => (
                        <Paper
                          key={index}
                          onClick={() => handleImageClick(index)} // Make the Paper clickable
                          sx={{
                            width: 60,
                            height: 60,
                            borderRadius: '8px',
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid #e0e0e0',
                            boxShadow: 'none',
                            cursor: 'pointer', // Indicate clickable
                            backgroundColor: imageSrc ? 'transparent' : '#f0f0f0', // Grey background if no image
                            '&:hover': {
                              borderColor: 'primary.main', // Highlight on hover
                              boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.5)' // Blue border shadow on hover
                            }
                          }}
                        >
                          {imageSrc ? ( // If imageSrc exists, display the image, otherwise display placeholder icon
                            <img
                              src={imageSrc}
                              alt={`Uploaded ${index + 1}`}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          ) : (
                            <AddPhotoAlternateIcon sx={{ fontSize: 20, color: '#bdbdbd' }} /> // Placeholder icon
                          )}
                        </Paper>
                      ))}
                    </Stack>
                  </Box>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          {/* Seller Response Accordion */}
          <Accordion
            expanded={expanded === 'panel2'}
            onChange={handleChange('panel2')}
            sx={{
              borderRadius: '8px',
              marginBottom: '10px',
              boxShadow: 'none',
              '&:before': { display: 'none' }
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
              sx={{
                backgroundColor: '#F7FAFC',
                borderRadius: '8px',
                minHeight: '48px',
                '&.Mui-expanded': {
                  minHeight: '48px'
                },
                '.MuiAccordionSummary-content,Mui-expanded': {
                  margin: '12px 0'
                }
              }}
            >
              <Typography sx={{ fontWeight: 'medium', fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                Seller Response
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: '16px', borderTop: '1px solid #e0e0e0' }}>
              {/* Content visible only when Seller Response accordion is expanded */}
              {expanded === 'panel2' && (
                <Box>
                  <Typography variant="body2" sx={{ color: '#555', mb: 2 }}>
                    We’d like to help resolve this quickly, but we need a bit more information to proceed. The images
                    provided do not clearly show the issue described. Kindly upload a clearer photo of the item,
                    packaging, or any specific damage you encountered. If possible, include the batch number or product
                    label for verification. Once we receive the additional details, we’ll promptly review your request
                    again. Thank you for your cooperation!
                  </Typography>
                  <Stack direction={{ xs: 'column' }} spacing={2}>
                    <Button
                      style={{ width: '226px', height: '40px' }}
                      variant="contained"
                      sx={{
                        backgroundColor: '#65D235', // Green background
                        color: '#FAFAFA',
                        fontWeight: 'bold',
                        borderRadius: '50px',
                        padding: '10px 20px',
                        textTransform: 'none',
                        boxShadow: 'none', // Remove default shadow
                        '&:hover': {
                          backgroundColor: '#5cb85c' // Darker green on hover
                        }
                      }}
                    >
                      View Return Label
                    </Button>
                    <Button
                      style={{ width: '226px', height: '40px' }}
                      variant="contained"
                      sx={{
                        backgroundColor: '#65D235', // Green background
                        color: '#FAFAFA',
                        fontWeight: 'bold',
                        borderRadius: '50px',
                        padding: '10px 20px',
                        textTransform: 'none',
                        boxShadow: 'none',
                        '&:hover': {
                          backgroundColor: '#5cb85c' // Darker green on hover
                        }
                      }}
                    >
                      Download Return Label
                    </Button>
                  </Stack>
                </Box>
              )}
            </AccordionDetails>
          </Accordion>

          {/* Decision Accordion */}
          <Accordion
            expanded={expanded === 'panel3'}
            onChange={handleChange('panel3')}
            sx={{
              borderRadius: '8px',
              marginBottom: '10px',
              boxShadow: 'none',
              '&:before': { display: 'none' }
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3bh-content"
              id="panel3bh-header"
              sx={{
                backgroundColor: '#F7FAFC',
                borderRadius: '8px',
                minHeight: '48px',
                '&.Mui-expanded': {
                  minHeight: '48px'
                },
                '.MuiAccordionSummary-content, Mui-expanded': {
                  margin: '12px 0'
                }
              }}
            >
              <Typography sx={{ fontWeight: 'medium', fontSize: { xs: '0.9rem', sm: '1rem' } }}>Decision</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: '16px', borderTop: '1px solid #e0e0e0' }}>
              <Typography variant="body2" sx={{ color: '#555' }}>
                <span style={{ color: 'red' }}> On Hold →</span> To proceed with the review, we need additional evidence
                related to the issue you've reported. This may include clearer images of the item, close-ups of the
                damage, or supporting details that can help us make a fair decision. Please update your request within
                the next 48 hours. If no further information is provided, the case may be closed due to insufficient
                documentation.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>

        {/* Your Return Received And Processed Section */}
        <Card
          sx={{
            backgroundColor: '#F7FAFC', // Changed to match the image's background
            border: '1px solid #E0E0E0', // Applied light grey border as seen in the image
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)', // Subtle shadow
            padding: '20px',
            marginTop: '30px', // Spacing from previous section
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' }, // Responsive layout
            alignItems: { xs: 'flex-start', sm: 'center' }, // Align items
            justifyContent: 'space-between', // Space out content
            gap: '20px' // Gap between text and buttons
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 'bold', color: '#333', mb: 1, fontSize: { xs: '1.1rem', sm: '13px' } }}
            >
              Your Return Has Been Received And Processed!
            </Typography>
            <Typography variant="body2" sx={{ color: '#000000', mb: 1.5, fontSize: { xs: '0.8rem', sm: '0.6rem' } }}>
              We've inspected the returned item and completed your refund of <br />
              <span style={{ fontWeight: 'bold' }}>$XX.XX</span> to your original payment method.
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: '#000000', mb: 1.5, fontSize: { xs: '0.8rem', sm: '0.6rem' }, mt: { xs: 0, sm: '-10px' } }}
            >
              Please allow 3–5 business days for the amount to appear on your <br /> statement.
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: '#000000', mb: 2, fontSize: { xs: '0.8rem', sm: '0.6rem' }, mt: { xs: 0, sm: '-10px' } }}
            >
              Thank you for shopping with BuyHalalGoods. If you have any <br /> questions, feel free to contact our
              support team.
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: '#000000', fontSize: { xs: '0.8rem', sm: '0.6rem' }, mt: { xs: 0, sm: '-10px' } }}
            >
              Rate the return/refund experience or leave a review.
            </Typography>
          </Box>
          <Stack direction="column" spacing={1.5} sx={{ width: { xs: '100%', sm: '200px' }, mt: { xs: 2, sm: 0 } }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#65D235',
                color: 'white',
                fontWeight: 'bold',
                borderRadius: '50px',
                padding: '10px 15px',
                textTransform: 'none',
                boxShadow: 'none', // Remove default shadow
                '&:hover': {
                  backgroundColor: '#5cb85c',
                  boxShadow: 'none'
                }
              }}
            >
              View Refund Details
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#14AE5C', // Changed to match the image's green shade
                color: 'white',
                fontWeight: 'bold',
                borderRadius: '50px',
                padding: '10px 15px',
                textTransform: 'none',
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: '#119c4d', // Darker shade on hover
                  boxShadow: 'none'
                }
              }}
            >
              Shop More Halal Products
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderColor: 'black', // Light grey border
                color: '#555', // Dark grey text
                fontWeight: 'bold',
                borderRadius: '50px',
                padding: '10px 15px',
                textTransform: 'none',
                '&:hover': {
                  borderColor: '#A0A0A0',
                  backgroundColor: '#F5F5F5'
                }
              }}
            >
              Contact Support
            </Button>
          </Stack>
        </Card>

        {/* Product Details Section (New from Image) */}
        <Card
          sx={{
            backgroundColor: '#F7FAFC',
            marginTop: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
            padding: '20px',
            marginBottom: '30px', // Spacing before the main refund request card
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' }, // Responsive layout
            alignItems: { xs: 'flex-start', sm: 'center' }, // Align items
            justifyContent: 'space-between', // Space out content
            gap: '20px' // Gap between text and buttons
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '15px', flexGrow: 1 }}>
            {/* Product Image */}
            <Box
              style={{ width: '121px', height: '129px' }}
              component="img"
              src="/images/bottle.png" // Placeholder image for product
              sx={{
                width: 80,
                height: 80,
                borderRadius: '8px',
                objectFit: 'cover',
                border: '1px solid #E0E0E0'
              }}
            />
            {/* Product Details Text */}
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <Typography variant="body2" sx={{ color: 'black', fontSize: '0.8rem', marginTop: '5px' }}>
                  Sold by Khair Vitamins
                </Typography>
                <Typography variant="body2" sx={{ color: '#555', fontSize: '0.8rem', ml: 0.5 }}>
                  &gt;
                </Typography>
              </Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 'bold', color: '#333', fontSize: { xs: '1rem', sm: '1.1rem', marginTop: '-6px' } }}
              >
                Khair Halal Vitamin C Gummies...
              </Typography>
              <Typography variant="body2" sx={{ color: '#555', fontSize: '0.8rem', mb: 0.5, marginTop: '-4px' }}>
                Order ID:{' '}
                <Link href="#" sx={{ color: '#0B1C13', cursor: 'pointer', textDecoration: 'underline' }}>
                  819911377744349
                </Link>
              </Typography>
              <Typography variant="body2" sx={{ color: '#555', fontSize: '0.8rem', mb: 0.5, marginTop: '-4px' }}>
                Quantity: 1
              </Typography>
              <Typography variant="body2" sx={{ color: 'black', fontSize: '0.8rem', mb: 1, marginTop: '-4px' }}>
                Order Amount: <span style={{ fontWeight: 'bold' }}>$30.99</span>
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '-8px' }}>
                <InfoOutlinedIcon sx={{ color: '#718096', fontSize: '16px', mr: 0.5 }} />
                <Typography variant="body2" sx={{ color: '#555', fontSize: '0.75rem' }}>
                  This product is eligible for return.
                </Typography>
                <Link
                  href="#"
                  sx={{
                    color: 'black',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    fontSize: '0.75rem',
                    ml: 0.5
                  }}
                >
                  Request Return
                </Link>
              </Box>
            </Box>
          </Box>
          {/* Action Buttons for Product Details */}
          <Stack
            direction={{ xs: 'column', sm: 'column' }}
            spacing={1.5}
            sx={{ width: { xs: '100%', sm: '200px' }, mt: { xs: 2, sm: 0 } }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#65D235',
                color: 'white',
                fontWeight: 'bold',
                borderRadius: '50px',
                padding: '10px 15px',
                textTransform: 'none',
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: '#5cb85c',
                  boxShadow: 'none'
                }
              }}
            >
              Contact Support
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderColor: 'black',
                color: '#555',
                fontWeight: 'bold',
                borderRadius: '50px',
                padding: '10px 15px',
                textTransform: 'none',
                '&:hover': {
                  borderColor: '#A0A0A0',
                  backgroundColor: '#F5F5F5'
                }
              }}
            >
              Cancel Request
            </Button>
          </Stack>
        </Card>

        {/* tracking card------ */}

        <Typography
          variant="h6"
          sx={{ fontWeight: 'bold', marginBottom: '20px', fontSize: { xs: '1rem', sm: '1.1rem' } }}
        >
          Tracking Progress
        </Typography>

        <Box sx={{ padding: '30px', backgroundColor: '#F7FAFC', borderRadius: '8px' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%' // Ensure the flex container takes full width
            }}
          >
            {steps.map((step, index) => (
              // Use React.Fragment or a wrapper Box for siblings without extra DOM node
              <React.Fragment key={step.id}>
                {/* Render line segment before each step except the first one */}
                {index > 0 && (
                  <Box
                    style={{ marginRight: '-10px' }}
                    sx={{
                      flexGrow: 1, // Allows the line to take up available space between circles
                      height: '4px',
                      borderRadius: '2px',
                      // Line color is green if the current step (index) is active or completed
                      backgroundColor: index <= activeStep ? '#65D235' : '#e0e0e0',
                      transition: 'background-color 0.3s ease-in-out', // Smooth color transition
                      marginTop: '-22px',
                      marginLeft: '-20px'
                    }}
                  />
                )}
                {/* Render the step (circle + text) */}
                <Box
                  style={{ marginRight: '12px' }}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    zIndex: 1, // Ensure circles are above the lines
                    cursor: 'pointer', // Indicate that the step is clickable
                    textAlign: 'center', // Center text below the circle
                    flexShrink: 0 // Prevent circles from shrinking
                  }}
                  onClick={() => handleStepClick(step.id)} // Click handler to update active step
                >
                  <Box
                    sx={{
                      width: 20, // Circle size
                      height: 20,
                      borderRadius: '50%', // Make it a perfect circle
                      // **UPDATED LOGIC HERE:**
                      // Background color is green if step is active or completed, white if inactive
                      backgroundColor: index <= activeStep ? 'green' : 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'background-color 0.3s ease-in-out', // Smooth color transition for circle
                      // Border for inactive circles, none for active/completed (green background will cover)
                      border: index <= activeStep ? 'none' : '1px solid #9e9e9e'
                    }}
                  >
                    {/* **UPDATED LOGIC HERE:** */}
                    {/* CheckCircleIcon color: white if active/completed, black if inactive */}
                    <CheckCircleIcon
                      sx={{
                        fontSize: 20,
                        color: index <= activeStep ? 'white' : 'white',
                      }}
                    />
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{
                      marginTop: '8px',
                      color: index <= activeStep ? '#333' : '#777', // Darker text for active/completed, lighter for others
                      fontWeight: index <= activeStep ? 'bold' : 'normal', // Bold text for active/completed
                      fontSize: { xs: '0.6rem', sm: '0.75rem' } // Responsive font size
                    }}
                  >
                    {step.name}
                  </Typography>
                </Box>
              </React.Fragment>
            ))}
          </Box>
        </Box>
      </Card>
    </div>
  );
}