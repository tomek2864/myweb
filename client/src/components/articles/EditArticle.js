import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  addArticle,
  getArticleByID,
  deleteArticle
} from "../../actions/articleActions";
import { withStyles, createMuiTheme } from "@material-ui/core/styles";
import {
  Checkbox,
  ListItemText,
  MenuItem,
  Button,
  Input,
  InputLabel,
  Select,
  Grid,
  TextField,
  FormControl,
  FormHelperText,
  Paper,
  LinearProgress
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  Editor,
  EditorState,
  RichUtils,
  AtomicBlockUtils,
  convertToRaw,
  convertFromRaw,
  ContentState,
  convertFromHTML,
  convertToHTML
} from "draft-js";
import BlockStyleToolbar, {
  getBlockStyle
} from "../blockStylesRichFieldText/BlockStyleToolbar";

import { mediaBlockRenderer } from "../blockStylesRichFieldText/entities/mediaBlockRenderer";

import { stateToHTML } from "draft-js-export-html";
import createStyles from "draft-js-custom-styles";
import isEmpty from "../../validation/is-empty";
import { Link, withRouter } from "react-router-dom";

const chooseTags = [
  "Agile",
  "Amazon",
  "APIs",
  "Applications",
  "Architecture",
  "Autocad",
  "Azure",
  "Big Data",
  "C",
  "Cloud Applications",
  "Communication",
  "Configuration",
  "Database",
  "Data Mining",
  "Data Science",
  "Design",
  "Design Tools",
  "Development",
  "Front End Design",
  "Google Analytics",
  "Hardware",
  "Help Desk",
  "HTML",
  "Identify User Needs",
  "Implementation",
  "Information Architecture",
  "Internet",
  "IT Optimization",
  "IT Security",
  "IT Solutions",
  "IT Support",
  "Leadership",
  "Linux",
  "Management",
  "Microsoft Office",
  "Mobile Applications",
  "Motivation",
  "Networks",
  "Network Operations",
  "Node.js",
  "Operating Systems",
  "PHP",
  "Programming",
  "Problem Solving",
  "Product Design",
  "Product Management",
  "Responsive Design",
  "Search Engine Optimization (SEO)",
  "Security",
  "Servers",
  "Software",
  "Software Development",
  "Software Engineering",
  "UI / UX",
  "Virtualization",
  "Web Applications",
  "Web Development",
  "Web Technologies",
  "Embeeded systems",
  "Automation technology",
  "Beckhoff",
  "SCADA",
  "InduSoft",
  "Electronics",
  "Electrics",
  "Automotive",
  "Robots",
  "KUKA",
  "Industry",
  "Qt",
  "JavaScript",
  "React",
  "VisualStudio Code",
  "C++",
  "Raspberry Pi",
  "Windows",
  "Expo",
  "Motion",
  "STM32",
  "Eclipse",
  "ARM",
  "Armbian",
  "University",
  "Green Energy",
  "Express",
  "C#",
  "OOP"
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const styles = theme => ({
  textField: {
    width: "auto",
    display: "flex",
    margin: theme.spacing.unit
  },
  textFieldLink: {
    width: "75%",
    display: "flex",
    margin: theme.spacing.unit
  },
  formControl: {
    margin: theme.spacing.unit,
    width: "auto",
    display: "flex"
  },
  helpText: {
    margin: theme.spacing.unit,
    width: "auto",
    display: "flex"
  },
  helpTextError: {
    margin: theme.spacing.unit,
    width: "auto",
    display: "flex",
    color: "#ff0000"
  },
  submit: {
    margin: theme.spacing.unit,
    width: "auto",
    display: "flex"
  },
  paper: {
    maxWidth: 1000,
    minHeight: "400px",
    marginBottom: 25,
    marginTop: 25,
    marginLeft: "auto",
    marginRight: "auto"
  },
  editors: {
    maxWidth: 1000,
    padding: 25,
    color: "#999"
  }
});

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
});

class EditArticle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      title: "",
      text: "",
      summary: "",
      yt: "",
      ytLinks: [{ yt: "" }],
      photo: "",
      photoLinks: [{ photo: "" }],
      tags: [],
      errors: {},
      //editorState: EditorState.createEmpty()
      editorState: EditorState.createEmpty()
    };
  }

  toggleBlockType = blockType => {
    this.onChangeEditor(
      RichUtils.toggleBlockType(this.state.editorState, blockType)
    );
  };

  handleKeyCommand = command => {
    const newState = RichUtils.handleKeyCommand(
      this.state.editorState,
      command
    );
    if (newState) {
      this.onChangeEditor(newState);
      return "handled";
    }
    return "not-handled";
  };

  onUnderlineClick = () => {
    this.onChangeEditor(
      RichUtils.toggleInlineStyle(this.state.editorState, "UNDERLINE")
    );
  };

  onBoldClick = event => {
    this.onChangeEditor(
      RichUtils.toggleInlineStyle(this.state.editorState, "BOLD")
    );
  };

  onItalicClick = () => {
    this.onChangeEditor(
      RichUtils.toggleInlineStyle(this.state.editorState, "ITALIC")
    );
  };

  toggleBlockType = blockType => {
    this.onChangeEditor(
      RichUtils.toggleBlockType(this.state.editorState, blockType)
    );
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.article.article) {
      const article = nextProps.article.article;
      article.text = !isEmpty(article.text) ? article.text : "";
      article.summary = !isEmpty(article.summary) ? article.summary : "";
      article.title = !isEmpty(article.title) ? article.title : "";
      article.tags = !isEmpty(article.tags) ? article.tags : [];

      article.photoLinks = !isEmpty(article.photoLinks)
        ? article.photoLinks
        : "";
      article.ytLinks = !isEmpty(article.ytLinks) ? article.ytLinks : "";

      const html = article.text
        .toString()
        .replace("<figure><img", "[Link do obrazka należy dodać ponownie]");
      if (html !== "") {
        const contentBlock = convertFromHTML(html);
        const contentState = ContentState.createFromBlockArray(contentBlock);
        this.setState({
          id: article._id,
          title: article.title,
          summary: article.summary,
          photoLinks: article.photoLinks,
          ytLinks: article.ytLinks,
          editorState: EditorState.createWithContent(contentState),
          tags: article.tags
        });
      }
    }
  }

  onSubmit = event => {
    event.preventDefault();
    const { user } = this.props.auth;

    const newArticle = {
      title: this.state.title,
      summary: this.state.summary,
      //text: this.state.text,
      /* text: JSON.stringify(
        convertToRaw(this.state.editorState.getCurrentContent())
      ), 
      text: stateToHTML(this.state.editorState.getCurrentContent()),*/
      text: stateToHTML(this.state.editorState.getCurrentContent()),
      name: user.name,
      tags: this.state.tags.toString(),
      photoLinks: this.state.photoLinks,
      ytLinks: this.state.ytLinks
    };
    if (this.props.auth.isAuthenticated === true) {
      this.props.deleteArticle(this.state.id);
      this.props.addArticle(newArticle);
      this.props.history.push("/dashboard");
    }
    //this.props.addArticle(newArticle);
    // this.setState({ text: "" });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeTag = event => {
    this.setState({ tags: event.target.value });
  };

  onChangeEditor = editorState => {
    this.setState({ editorState });
  };

  focus = () => this.refs.editor.focus();

  onAddImage = e => {
    e.preventDefault();
    const editorState = this.state.editorState;
    const urlValue = window.prompt("Wklej link obrazka");
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "image",
      "IMMUTABLE",
      { src: urlValue }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(
      editorState,
      { currentContent: contentStateWithEntity },
      "create-entity"
    );
    this.setState(
      {
        editorState: AtomicBlockUtils.insertAtomicBlock(
          newEditorState,
          entityKey,
          " "
        )
      },
      () => {
        setTimeout(() => this.focus(), 0);
      }
    );
  };

  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getArticleByID(this.props.match.params.id);
    }
  }

  addPhotoLink = () => {
    this.setState({
      photoLinks: this.state.photoLinks.concat({ photo: "" }) // tworzy kopie tablicy z nowym elementem
    });
  };

  removePhotoLink = newPhotoIndex => () => {
    this.setState({
      photoLinks: this.state.photoLinks.filter(
        (photo, index) => newPhotoIndex !== index // nowa tablica z wykonaniem testu obecnosci elementow
      ) //
    });
  };

  changePhotoLink = newPhotoIndex => event => {
    const newPhotoLinks = this.state.photoLinks.map((photoLink, index) => {
      if (newPhotoIndex !== index) return photoLink;
      return { ...photoLink, photo: event.target.value };
    });
    this.setState({ photoLinks: newPhotoLinks });
  };

  addYoutubeLink = () => {
    this.setState({
      ytLinks: this.state.ytLinks.concat({ yt: "" }) // tworzy kopie tablicy z nowym elementem
    });
  };

  removeYoutubeLink = newYoutubeIndex => () => {
    this.setState({
      ytLinks: this.state.ytLinks.filter(
        (y, index) => newYoutubeIndex !== index // nowa tablica z wykonaniem testu obecnosci elementow
      ) //
    });
  };

  changeYoutubeLink = newYoutubeIndex => event => {
    const newYoutubeLink = this.state.ytLinks.map((ytLink, index) => {
      if (newYoutubeIndex !== index) return ytLink;
      return { ...ytLink, yt: event.target.value };
    });
    this.setState({ ytLinks: newYoutubeLink });
  };

  render() {
    const { classes } = this.props;
    const { errors } = this.state; // ES6
    const { article, loading } = this.props.article;
    let articleContent;
    console.log(article);
    if (article === null || loading) {
      articleContent = <LinearProgress />;
    } else {
      articleContent = (
        <div>
          <Grid container>
            <Grid className={classes.grid} item xs />
            <Grid className={classes.grid} item xs={8}>
              <TextField
                name="title"
                label="Tytuł artykułuuu"
                placeholder="Tytuł"
                className={classes.textField}
                value={this.state.title}
                onChange={this.onChange}
                error={errors.title}
                margin="normal"
                variant="outlined"
                fullWidth
              />
              {errors.title && (
                <FormHelperText
                  className={classes.helpTextError}
                  id="title-error"
                >
                  {errors.title}
                </FormHelperText>
              )}
            </Grid>
            <Grid className={classes.grid} item xs />
          </Grid>
          <Grid container>
            <Grid className={classes.grid} item xs />
            <Grid className={classes.grid} item xs={8}>
              <TextField
                name="summary"
                label="Streszczenie artykułu"
                placeholder="Streszczenie"
                className={classes.textField}
                value={this.state.summary}
                onChange={this.onChange}
                error={errors.summary}
                margin="normal"
                variant="outlined"
                fullWidth
              />
              {errors.summary && (
                <FormHelperText
                  className={classes.helpTextError}
                  id="summary-error"
                >
                  {errors.summary}
                </FormHelperText>
              )}
            </Grid>
            <Grid className={classes.grid} item xs />
          </Grid>
          <Grid container>
            <Grid className={classes.grid} item xs />
            <Grid className={classes.grid} item xs={8}>
              <div className="editorContainer">
                <div className="toolbar">
                  <BlockStyleToolbar
                    editorState={this.state.editorState}
                    onToggle={this.toggleBlockType}
                  />
                  <Button onClick={this.onUnderlineClick}>U</Button>
                  <Button onClick={this.onBoldClick}>
                    <b>B</b>
                  </Button>
                  <Button onClick={this.onItalicClick}>
                    <em>I</em>
                  </Button>
                  <Button onClick={this.onAddImage}>
                    <i className="material-icons">image</i>
                  </Button>
                </div>
              </div>
            </Grid>
            <Grid className={classes.grid} item xs />
          </Grid>

          <Grid container>
            <Grid className={classes.grid} item xs>
              <Paper className={classes.paper}>
                <div>
                  <Editor
                    className={classes.editors}
                    name="text"
                    blockRendererFn={mediaBlockRenderer}
                    blockStyleFn={getBlockStyle}
                    editorState={this.state.editorState}
                    handleKeyCommand={this.handleKeyCommand}
                    onChange={this.onChangeEditor}
                    plugins={this.plugins}
                    ref="editor"
                    value={this.state.text}
                    rowsMax="30"
                    error={errors.text}
                    spellCheck
                  />
                </div>
              </Paper>
            </Grid>
          </Grid>
          <Grid container>
            <Grid className={classes.grid} item xs />
            <Grid className={classes.grid} item xs={8}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="select-multiple-checkbox">Tag</InputLabel>
                <Select
                  multiple
                  value={this.state.tags}
                  onChange={this.onChangeTag}
                  input={<Input id="select-multiple-checkbox" />}
                  renderValue={selected => selected.join(", ")}
                  MenuProps={MenuProps}
                  error={errors.tags}
                >
                  {chooseTags.map(tag => (
                    <MenuItem key={tag} value={tag}>
                      <Checkbox checked={this.state.tags.indexOf(tag) > -1} />
                      <ListItemText primary={tag} />
                    </MenuItem>
                  ))}
                </Select>
                {errors.tags && (
                  <FormHelperText
                    className={classes.helpTextError}
                    id="tags-error"
                  >
                    {errors.tags}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>{" "}
            <Grid className={classes.grid} item xs />
          </Grid>
          {this.state.photoLinks.map((photoLink, index) => (
            <Grid container>
              <Grid className={classes.grid} item xs />
              <Grid className={classes.grid} item xs={8}>
                <div>
                  <TextField
                    name="photoLinks"
                    id="photoLinks"
                    label={`Podaj link do zdjęcia nr ${index + 1}`}
                    placeholder="Link do zdjęcia"
                    className={classes.textFieldLink}
                    value={photoLink.photo}
                    onChange={this.changePhotoLink(index)}
                    error={errors.photoLinks}
                    margin="normal"
                    variant="outlined"
                  />
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                    onClick={this.removePhotoLink(index)}
                  >
                    <DeleteIcon className={classes.rightIcon} />
                  </Button>
                </div>
              </Grid>
              <Grid className={classes.grid} item xs />
            </Grid>
          ))}
          <Grid container>
            <Grid className={classes.grid} item xs />
            <Grid className={classes.grid} item xs={8}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this.addPhotoLink}
              >
                Nowe zdjęcie
              </Button>
            </Grid>
            <Grid className={classes.grid} item xs />
          </Grid>
          {this.state.ytLinks.map((ytLink, index) => (
            <Grid container>
              <Grid className={classes.grid} item xs />
              <Grid className={classes.grid} item xs={8}>
                <div>
                  <TextField
                    name="ytLinks"
                    id="ytLinks"
                    label={`Podaj link do filmiku na youtube nr ${index + 1}`}
                    placeholder="Link do youtube"
                    className={classes.textFieldLink}
                    value={ytLink.yt}
                    onChange={this.changeYoutubeLink(index)}
                    error={errors.ytLinks}
                    margin="normal"
                    variant="outlined"
                  />
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                    onClick={this.removeYoutubeLink(index)}
                  >
                    <DeleteIcon className={classes.rightIcon} />
                  </Button>
                </div>
              </Grid>
              <Grid className={classes.grid} item xs />
            </Grid>
          ))}
          <Grid container>
            <Grid className={classes.grid} item xs />
            <Grid className={classes.grid} item xs={8}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this.addYoutubeLink}
              >
                Nowy film
              </Button>
            </Grid>
            <Grid className={classes.grid} item xs />
          </Grid>
          <Grid container>
            <Grid className={classes.grid} item xs />
            <Grid className={classes.grid} item xs={8}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this.onSubmit}
              >
                Dodaj
              </Button>
            </Grid>
            <Grid className={classes.grid} item xs />
          </Grid>
        </div>
      );
    }

    return <div>{articleContent}</div>;
  }
}

//https://material-ui.com/demos/autocomplete/

EditArticle.propTypes = {
  addArticle: PropTypes.func.isRequired,
  getArticleByID: PropTypes.func.isRequired,
  deleteArticle: PropTypes.func.isRequired,
  article: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  article: state.article,
  errors: state.errors
});

export default withRouter(
  connect(
    mapStateToProps,
    { addArticle, getArticleByID, deleteArticle }
  )(withStyles(styles)(EditArticle))
);
