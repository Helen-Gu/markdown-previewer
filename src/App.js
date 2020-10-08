import React, { Component } from 'react';
import marked from 'marked';
import './App.css';

marked.setOptions({
	breaks: true,
});
// Set a function to be used by the marked Renderer, the bit that takes markdown and translates it to html.
const renderer = new marked.Renderer();

const Toolbar = (props) => {
	return (
		<div className="toolbar">
			{props.text}
			<i className={props.icon} onClick={props.onClick} />
		</div>
	);
};

const Editor = (props) => {
	return (
		<textarea
			id="editor"
			value={props.markdown}
			onChange={props.onChange}
			type="text"
		/>
	);
};

// dangerouslySetInnerHTML is React's replacement for using innerHTML in the browser DOM.
const Previewer = (props) => {
	return (
		<div
			id="previewer"
			dangerouslySetInnerHTML={{
				__html: marked(props.markdown, { renderer: renderer }),
			}}
		/>
	);
};
const placeholder = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`;
export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			markdown: placeholder,
			editorMaximized: false,
			previewMaximized: false,
		};
	}
	handleChange = (e) => {
		this.setState({
			markdown: e.target.value,
		});
	};
	handleEditorMaximized = () => {
		this.setState({
			editorMaximized: !this.state.editorMaximized,
		});
	};

	handlePreviewMaximized = () => {
		this.setState({
			previewMaximized: !this.state.previewMaximized,
		});
	};
	render() {
		const classes = this.state.editorMaximized
			? ['editorWrap maximized', 'previewWrap hide', 'fa fa-compress']
			: this.state.previewMaximized
			? ['editorWrap hide', 'previewWrap maximized', 'fa fa-compress']
			: ['editorWrap', 'previewWrap', 'fa fa-arrows-alt'];
		return (
			<div>
				<div className={classes[0]}>
					<Toolbar
						icon={classes[2]}
						onClick={this.handleEditorMaximized}
						text="Editor"
					/>
					<Editor markdown={this.state.markdown} onChange={this.handleChange} />
				</div>
				<div className={classes[1]}>
					<Toolbar
						icon={classes[2]}
						onClick={this.handlePreviewMaximized}
						text="Previewer"
					/>
					<Previewer markdown={this.state.markdown} />
				</div>
			</div>
		);
	}
}
