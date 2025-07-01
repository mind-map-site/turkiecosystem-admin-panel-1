import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useFormikForm from 'src/hooks/use-formik-form';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Box,
  Button,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
} from '@mui/material';
import { getFilterData } from 'src/@mock-api/api/ecosystem-api';

const AdminUpdateData = ({
  initialValues,
  data,
  updateData,
  inputs,
  useValidation,
  section,
  setReload,
}) => {
  const [newsId, setNewsId] = useState("");
  const [singleData, setSingleData] = useState("");
  const [filterData, setFilterData] = useState("");
  const validations = useValidation();
  const formik = useFormikForm(initialValues, validations, onSubmit);

  useEffect(() => {
    const getEcosystemFilterData = async () => {
      const res = await getFilterData();
      if (res.status === 200) {
        setFilterData(res.data.data);
      }
    }
    getEcosystemFilterData();


    if (singleData) {
      const updatedValues = { ...formik.values };
      inputs.forEach((input) => {
        if (input.isLang && input.type === "text") {
          updatedValues[`${input.name}En`] = singleData[input.id]?.en || "";
          updatedValues[`${input.name}Ru`] = singleData[input.id]?.ru || "";
          updatedValues[`${input.name}Az`] = singleData[input.id]?.az || "";
        }
        else if (input.type === "select") {
          console.log(singleData[input.name]);
          if (input.name === "tagIndustry") {
            updatedValues[input.name] = singleData[input.name]?.map(tag => tag._id) || [];
          } else {
            updatedValues[input.name] = singleData[input.name]?._id || "";
          }
        }
        else {
          updatedValues[input.name] = singleData[input.id] || "";
        }
      });
      formik.setValues(updatedValues);
    }
  }, [singleData, inputs]);

  function onSubmit(values) {
    const formattedData = {};
    inputs.forEach((input) => {
      if (input.isLang) {
        formattedData[`${input.id}.en`] = values[`${input.name}En`];
        formattedData[`${input.id}.ru`] = values[`${input.name}Ru`];
        formattedData[`${input.id}.az`] = values[`${input.name}Az`];
      } else if (input.type === "select") {
        formattedData[input.name] = values[input.name];
      }
      else {
        formattedData[input.id] = values[input.name];
      }
    });

    console.log("Formatted Data:", formattedData);

    try {
      updateData(newsId, formattedData);
      toast.success(`${section} has been updated successfully`);
    } catch (error) {
      toast.error(`${section} has failed to update`);
    } finally {
      setReload((prev) => prev + 1);
    }
  }
  console.log(formik.values.tagCountry);

  const handleSingleData = () => {
    console.log("News ID:", newsId, "Data:", data);
    const findedData = data.find((_d) => String(_d.id) === String(newsId));
    setSingleData(findedData);
  };

  return (
    <div>
      {(section !== "ecosystem") ? (
        <Box my={2}>
          You will create just title and description, image can be updated with another tab.
        </Box>

      ) : <Box my={2}>
        You will update title and description and tags for profile, industry and country, image can be updated with another tab.
      </Box>
      }

      <Stack justifyContent="center" alignItems="center" className="my-3">
        <Typography>
          Which {section} do you want to update? Please enter {section} Id
        </Typography>
        <TextField
          label="News Id"
          name="newsId"
          value={newsId}
          onChange={(e) => setNewsId(e.target.value)}
        />
        <Button onClick={handleSingleData} className="capitalize">
          Find {section}
        </Button>
      </Stack>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {inputs.map(({ title, description, type, isLang, id, name }, i) => (
          <div key={i}>
            <Box className="p-2 mb-4">
              <h5 className="text-lg font-semibold">{title}</h5>
              <p className="text-sm">{description}</p>
            </Box>

            {(isLang && type === "text") ? (
              <Card className="mt-2">
                <CardContent className="space-y-2">
                  {/** Render language-specific fields dynamically */}
                  {["En", "Ru", "Az"].map((langSuffix) => (
                    <Accordion key={langSuffix}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        {langSuffix === "En"
                          ? "English"
                          : langSuffix === "Ru"
                            ? "Russian"
                            : "Azerbaijani"}
                      </AccordionSummary>
                      <AccordionDetails>
                        <TextField
                          multiline
                          rows={6}
                          fullWidth
                          id={`${id}${langSuffix}`}
                          name={`${name}${langSuffix}`}
                          value={formik.values[`${name}${langSuffix}`]}
                          onChange={formik.handleChange}
                          error={
                            formik.touched[`${name}${langSuffix}`] &&
                            Boolean(formik.errors[`${name}${langSuffix}`])
                          }
                          helperText={
                            formik.touched[`${name}${langSuffix}`] &&
                            formik.errors[`${name}${langSuffix}`]
                          }
                        />
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </CardContent>
              </Card>
            ) : (type === "select" && filterData) ?
              <FormControl fullWidth>
                <InputLabel id={`label-${name}`}>{title}</InputLabel>
                <Select
                  name={name}
                  labelId={`label-${name}`}
                  id={`select-${name}`}
                  value={formik.values[name]}
                  label={title}
                  onChange={formik.handleChange}
                  multiple={name === "tagIndustry"}
                  renderValue={(selected) =>
                    name === "tagIndustry"
                      ? filterData[id]
                        .filter(tag => selected.includes(tag.id))
                        .map(tag => tag.name?.en)
                        .join(', ')
                      : filterData[id]?.find(tag => tag.id === selected)?.name?.en || ""
                  }
                >
                  {filterData[id].map((tag) => {
                    const isMulti = name === "tagIndustry";
                    const selected = formik.values[name];

                    return (
                      <MenuItem key={tag.id} value={tag.id}>
                        {isMulti ? (
                          <>
                            <Checkbox
                              checked={selected.includes(tag.id)}
                              style={{ marginRight: 8 }}
                            />
                            {tag?.name?.en}
                          </>
                        ) : (
                          tag?.name?.en
                        )}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              : null}

            {(!isLang && type !== "select") && (
              <TextField
                fullWidth
                id={id}
                name={name}
                value={formik.values[name]}
                onChange={formik.handleChange}
                error={formik.touched[name] && Boolean(formik.errors[name])}
                helperText={formik.touched[name] && formik.errors[name]}
              />
            )}
          </div>
        ))}
        <CardActions className="p-4">
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </CardActions>
      </form>
    </div>
  );
};

export default AdminUpdateData;
