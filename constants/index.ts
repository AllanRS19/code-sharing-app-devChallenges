const appLogo = '/logo.svg';

const defaultEditorSnippet = `<html>

<head>
    <title>HTML Sample</title>
    <meta http - equiv="X-UA-Compatible" content="IE=edge" />
    <style type="text/css">
        h1 {
            color: #cca3a3;
        }
    </style>
    <script type="text/javascript">
        alert("I am a sample... visit devChallengs.io for more projects");
    </script>
</head>

<body>
    <h1>Heading No.1 </h1>
    <input disabled type = "button" value = "Click me" />
</body>

</html>
`;

const monacoEditorLanguagesOptions = ['HTML', 'TypeScript', 'JavaScript', 'JSON', 'CSS', 'LESS', 'SCSS'] as const;
export type MonacoEditorLanguage = typeof monacoEditorLanguagesOptions[number];
export type MonacoEditorLanguageValue = Lowercase<MonacoEditorLanguage>;

export {
    appLogo,
    defaultEditorSnippet,
    monacoEditorLanguagesOptions
}