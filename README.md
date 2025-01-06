# SpacyVis

SpacyVis is a web-based application that visualizes XML-annotated data through entity recognition and interactive highlighting. This project uses Node.js, Express, and EJS templating to provide an interface for uploading and exploring structured data.

## Features
- Upload XML files with annotated text.
- Visualize and highlight recognized entities.
- Dynamic color-coding for entity types.
- Interactive word statistics on hover.
- Adjustable entity color mapping.
- Magnifier tool to zoom in on words.

## Project Structure
```
SpacyVis/
|-- public/
|   |-- css/
|   |   |-- styles.css       # Styling for the interface
|   |-- js/
|   |   |-- index.js         # Client-side interactions and dynamic behavior
|-- views/
|   |-- index.ejs            # EJS template for rendering the main page
|-- server.js                # Express server handling routes and uploads
|-- package.json             # Project metadata and dependencies
```

## Installation
### Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/username/spacyvis.git
   cd spacyvis
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the server:
   ```bash
   node server.js
   ```
4. Access the app at:
   ```
   http://localhost:3000
   ```

## Usage
1. Start the server by running `node server.js`.
2. Upload XML files by selecting a file and clicking "Upload & Visualize!".
3. Hover over words to see detailed attributes in the sidebar.
4. Click entity color blocks to adjust the color representation.

## XML Input Format
The XML files should contain structured word elements with attributes that describe linguistic features.
Example:
```xml
<document>
    <word value="SpacyVis">
        <method value="ent_type_">ORG</method>
    </word>
    <word value="is">
        <method value="pos_">VERB</method>
    </word>
</document>
```

## Customization
- **styles.css**: Modify visual appearance.
- **index.js**: Customize client-side behavior and word stats interactions.
- **server.js**: Add additional routes or enhance file parsing logic.


## Overview of xml format
This XML format represents detailed linguistic annotations of tokens in a text, leveraging spaCy's attributes. Each token is encapsulated as a `<word>` element, containing a series of `<method>` elements that describe spaCy's linguistic features and metadata.

## Document Structure
### Root Element: `<document>`
- Encapsulates the entire parsed text.
- Contains multiple `<word>` elements, each corresponding to an individual token.

### Child Element: `<word>`
- Represents a single token in the text.
- Attributes:
  - `value` (required): The textual representation of the token.
- Contains multiple `<method>` elements that detail the token's linguistic attributes.

### Nested Element: `<method>`
- Describes a specific spaCy attribute or method.
- Attributes:
  - `value` (required): The value of the spaCy attribute.
- Text Content:
  - The inner text represents the serialized form or list-based output of the attribute.

## Example
```xml
<document>
  <word value="The">
    <method value="ancestors">['EBook']</method>
    <method value="children">[]</method>
    <method value="cluster">0</method>
    <method value="conjuncts">()</method>
    <method value="dep">415</method>
    <method value="dep_">det</method>
    <method value="ent_id">0</method>
    <method value="ent_id_"></method>
    <method value="ent_iob">3</method>
    <method value="ent_iob_">B</method>
    <method value="ent_kb_id">0</method>
    <method value="ent_kb_id_"></method>
    <method value="ent_type">388</method>
    <method value="ent_type_">WORK_OF_ART</method>
    <method value="has_vector">False</method>
    <method value="head">EBook</method>
    <method value="i">0</method>
    <method value="idx">0</method>
    <method value="is_alpha">False</method>
    <method value="is_ascii">False</method>
    <method value="is_bracket">False</method>
    <method value="is_currency">False</method>
    <method value="is_digit">False</method>
    <method value="is_left_punct">False</method>
    <method value="is_lower">False</method>
    <method value="is_oov">True</method>
    <method value="is_punct">False</method>
    <method value="is_quote">False</method>
    <method value="is_right_punct">False</method>
    <method value="is_sent_end">False</method>
    <method value="is_sent_start">True</method>
    <method value="is_space">False</method>
    <method value="is_stop">False</method>
    <method value="is_title">True</method>
    <method value="is_upper">False</method>
    <method value="lang">14626626061804382878</method>
    <method value="lang_">en</method>
    <method value="left_edge">The</method>
    <method value="lefts">[]</method>
    <method value="lemma">15924215345000170802</method>
    <method value="lemma_">the</method>
    <method value="lex">&lt;class 'spacy.lexeme.Lexeme'&gt;</method>
    <method value="lex_id">18446744073709551615</method>
    <method value="like_email">False</method>
    <method value="like_num">False</method>
    <method value="like_url">False</method>
    <method value="lower">15924215345000170802</method>
    <method value="lower_">the</method>
    <method value="morph">[]</method>
    <method value="n_lefts">0</method>
    <method value="n_rights">0</method>
    <method value="norm">15924215345000170802</method>
    <method value="norm_">the</method>
    <method value="orth">4093187768815832873</method>
    <method value="orth_">The</method>
    <method value="pos">90</method>
    <method value="pos_">DET</method>
    <method value="prefix">12603978805415480332</method>
    <method value="prefix_"></method>
    <method value="prob">-20.0</method>
    <method value="rank">18446744073709551615</method>
    <method value="right_edge">The</method>
    <method value="rights">[]</method>
    <method value="sent">['\ufeffThe', 'Project', 'Gutenberg', 'EBook', 'of', 'Worlds', 'Within', 'Worlds', ':', 'The', 'Story', 'of', 'Nuclear', '', 'Energy', ',', 'Volume', '1', '(', 'of', '3', ')', ',', 'by', 'Isaac', 'Asimov']</method>
    <method value="sent_start">False</method>
    <method value="sentiment">0.0</method>
    <method value="shape">8517715979031821888</method>
    <method value="shape_">Xxx</method>
    <method value="subtree">['\ufeffThe']</method>
    <method value="suffix">5059648917813135842</method>
    <method value="suffix_">The</method>
    <method value="tag">15267657372422890137</method>
    <method value="tag_">DT</method>
    <method value="text">The</method>
    <method value="text_with_ws">The</method>
    <method value="vector_norm">0.0</method>
    <method value="whitespace_"></method>
  </word>
  <word>...</word>
  ...
</document>
```

## Attribute Definitions
### `<word>` Attributes
- **value** (string): The exact text of the token.

### `<method>` Attributes
- **value** (string or numeric): A spaCy-derived attribute or method, which can represent dependency, part-of-speech tags, entity types, and more.

## Common spaCy Attributes
- **ancestors**: Tokens governing the current token in the syntactic tree.
- **children**: Immediate dependents of the token.
- **dep**/**dep_**: Dependency label (ID and string form).
- **ent_type**/**ent_type_**: Named entity type (ID and string form).
- **is_alpha**: Boolean indicating if the token is alphabetic.
- **is_sent_start**: Boolean marking the start of a sentence.
- **lang_**: Language of the token.
- **lemma_**: Lemmatized form of the token.
- **pos_**: Part-of-speech tag.

## Notes
- All spaCy attributes are dynamically extensible, allowing additional linguistic features to be serialized by simply adding new `<method>` elements.
- Attributes that return lists (like `ancestors` or `children`) are serialized as string representations of lists.
- Boolean attributes are serialized as "True" or "False."
- Attributes without direct values are left empty (`<method value="ent_kb_id_"></method>`).



## Dependencies
- Express (^4.18.2)
- EJS (^3.1.9)
- Multer (^1.4.5)
- xml2js (^0.6.2)
- html2canvas (^1.4.1)
- seedrandom (^3.0.5)

## License
This project is licensed under the ISC License.

