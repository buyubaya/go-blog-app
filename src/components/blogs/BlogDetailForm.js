import React, {
  useContext,
  useState,
} from "react";
import {
  Formik,
} from "formik";
import {
  Grid,
  Card,
  Form,
  Alert,
  Button,
  Loader,
  Dropdown,
} from "tabler-react";
// ACTIONs
import {
  addPost,
  updatePost,
} from "@/actions/posts";
import {
  addCategory,
  deleteCategory,
} from "@/actions/category";
// CONTEXT
import AppContext from "@/contexts/AppContext";


const BlogDetailForm = ({
  post,
  onUpdate,
}) => {

  const [newCategory, setNewCategory] = useState();
  const [categoryUpdating, setCategoryUpdating] = useState(false);

  const {
    categoryContext,
  } = useContext(AppContext) || {};
  const categories = categoryContext && categoryContext.data;
  const categoriesLoading = categoryContext && categoryContext.loading;
  const reloadCategories = categoryContext && categoryContext.reload;


  const _getFormErrors = (values) => {
    let errors = {};


    if (!post) {
      if (!values.title || !values.title.trim()) {
        errors.title = "Title is Required";
      }
  
  
      const categories = (
        Object.keys(values.categories || {})
          .filter(item => values.categories[item])
          .map(item => parseInt(item, 10, 64))
      );
      if (categories.length < 1) {
        errors._form = "Categories are Required";
      }
    }
    

    return errors;
  };


  const _buildRequestData = (values) => {

    const formValueKeys = Object.keys(values);
    formValueKeys.forEach(key => {
      if (
        typeof (values[key]) === "string" &&
        !(values[key] && values[key].trim())
      ) {
        delete values[key];
      }
    });


    return {
      title: (values.title || "").trim(),
      subtitle: (values.subtitle || "").trim(),
      description: (values.description || "").trim(),
      content: (values.content || "").trim(),
      categories: (
        Object.keys(values.categories || {})
          .filter(item => values.categories[item])
          .map(item => parseInt(item, 10, 64))
      ),
    };
  };


  const _addItem = async (values) => {
    await addPost(_buildRequestData(values));
  };


  const _editItem = async (values) => {
    await updatePost(
      post.id,
      _buildRequestData(values),
    );

    if (onUpdate) {
      onUpdate();
    }
  };


  const _handleSubmit = async (
    values,
    {
      setSubmitting,
      setErrors,
      resetForm,
    }
  ) => {

    // VALIDATE
    const _formErrors = _getFormErrors(values);

    if (Object.keys(_formErrors || {}).length) {
      setErrors(_formErrors);
      setSubmitting(false);
      return;
    }


    // SUBMIT
    setSubmitting(true);


    try {
      // ADD
      if (!post) {
        await _addItem(values);
      }
      

      // EDIT
      if (post) {
        await _editItem(values);
      }


      resetForm();
    } catch (error) {
      console.error("Update Post failed", error);
      setErrors({ _form: error.message });
    } finally {
      setSubmitting(false);
    }
  };


  const _mapCateArrayToCateObject = (arr = []) => {
    const obj = {};

    arr.forEach(item => {
      obj[item.categoryID] = true;
    });

    return obj;
  };


  // CATEGORY
  const _handleClickAddCategory = async () => {
    setCategoryUpdating(true);

    try {
      await addCategory({
        name: newCategory,
      });

      reloadCategories();
    } catch (error) {
      console.error("Add Category failed", error);
    } finally {
      setCategoryUpdating(false);
    }
  };


  const _handleClickDeleteCategory = (cid) => async () => {
    setCategoryUpdating(true);

    try {
      await deleteCategory(cid);

      reloadCategories();
    } catch(err) {
      console.error("Delete Category failed", err);
    } finally {
      setCategoryUpdating(false);
    }
  };


  return (
    <Formik
      initialValues={{
        title: (post && post.title) || "",
        subtitle: (post && post.subtitle) || "",
        description: (post && post.description) || "",
        content: (post && post.content) || "",
        categories: _mapCateArrayToCateObject(post && post.categories),
      }}
      onSubmit={_handleSubmit}
      render={({
        values,
        errors,
        // touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => {

        return (
          <>
            {
              errors && errors._form && (
                <Alert type="danger">
                  {errors._form}
                </Alert>
              )
            }

            <Grid.Row>
              <Grid.Col md={8} sm={12}>
                <Card>
                  <Card.Body>
                    <Form.Group label="Title">
                      <Form.Input
                        name="title"
                        placeholder="Title"
                        value={values.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={isSubmitting}
                        feedback={errors && errors.title}
                        invalid={errors && errors.title}
                      />
                    </Form.Group>

                    <Form.Group label="Subtitle">
                      <Form.Input
                        name="subtitle"
                        placeholder="Subtitle"
                        value={values.subtitle}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={isSubmitting}
                      />
                    </Form.Group>

                    <Form.Group label="Description">
                      <Form.Input
                        name="description"
                        placeholder="Description"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={isSubmitting}
                      />
                    </Form.Group>

                    <Form.Group
                      label={
                        <Form.Label aside={`${(values.content || "").length}/_`}>
                          Content
                        </Form.Label>
                      }
                    >
                      <Form.Textarea
                        name="content"
                        placeholder="Content"
                        rows={6}
                        value={values.content || " "}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={isSubmitting}
                      />
                    </Form.Group>
                  </Card.Body>

                  <Card.Footer>
                    <Button
                      color="primary"
                      size="sm"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                    >
                      Submit
                    </Button>
                  </Card.Footer>
                </Card>
              </Grid.Col>

              <Grid.Col md={4} sm={12}>
                <Card>
                  <Card.Body>
                    <Form.Group label="Categories">
                        {
                          categoriesLoading && <Loader />
                        }
                        
                        {
                          !categoriesLoading &&
                          categories && categories.map((item) => (
                            <Form.InputGroup>
                              <Form.Checkbox
                                key={item.id}
                                label={item.name}
                                name={`categories[${item.id}]`}
                                value={item.id}
                                checked={values.categories && values.categories[item.id]}
                                onChange={handleChange}
                                disabled={isSubmitting || categoryUpdating}
                                style={{
                                  background: "red"
                                }}
                              />

                              <div style={{ marginLeft: "auto" }}>
                                <Dropdown
                                  color="primary"
                                  icon="more-horizontal"
                                  toggle
                                  items={[
                                    <Dropdown.Item 
                                      key="edit"
                                      onClick={console.log}
                                    >
                                      Edit
                                    </Dropdown.Item>,
                                    <Dropdown.Item
                                      key="delete"
                                      onClick={_handleClickDeleteCategory(item.id)}
                                    >
                                      Delete
                                    </Dropdown.Item>,
                                  ]}
                                />
                              </div>
                            </Form.InputGroup>
                          ))
                        }
                      </Form.Group>

                    <Form.Group label="Add New Category">
                      <Form.InputGroup>
                        <Form.Input
                          placeholder="New Category..."
                          value={newCategory || ""}
                          onChange={(e) => setNewCategory(e.target.value)}
                          disabled={categoryUpdating}
                        />
                        <Form.InputGroupAppend>
                          <Button
                            color="primary"
                            icon="plus"
                            onClick={_handleClickAddCategory}
                            disabled={categoryUpdating}
                          />
                        </Form.InputGroupAppend>
                      </Form.InputGroup>
                    </Form.Group>
                  </Card.Body>
                </Card>
              </Grid.Col>
            </Grid.Row>
          </>
        );
      }}  
    />
  );
};


export default BlogDetailForm;