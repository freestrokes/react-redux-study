module.exports = {
	parser: "@typescript-eslint/parser",
	root: true,
	env: {
		browser: true,
		commonjs: true,
		es6: true,
		jest: true
	},
	extends: [
		"plugin:@typescript-eslint/recommended",
		"plugin:react/recommended",
		"plugin:import/errors",
		"plugin:import/warnings",
		"plugin:import/typescript",
		"plugin:prettier/recommended",
		"prettier",
	],
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: "module",
		ecmaFeatures: {
			"jsx": true
		}
	},
	rules: {
		"indent": "off",
		"camelcase": "off",
		"semi": "off",
		"quotes": "off",
		"no-shadow": "off",
		"no-use-before-define": "off",
		"no-unused-vars": "off",
		"no-console": "off",
		"no-magic-numbers": "off",
		"no-redeclare": "off",
		"no-array-constructor": "off",
		"no-dupe-class-members": "off",
		"no-extra-semi": "off",
		"no-empty-function": "off",
		"linebreak-style": "off",
		"prettier/prettier": "off",
		"jsx-a11y/no-noninteractive-element-interactions": "off",
		"import/extensions": "off",
		"import/no-unresolved": "off",
		"import/no-extraneous-dependencies": "off",
		"import/prefer-default-export": "off",
		"import/no-named-as-default": "off",
		/* react options */
		"react/prop-types": "off",
		"react/display-name": "off",
		"react/react-in-jsx-scope": "off",
		"react/destructuring-assignment": "off",
		"react/no-array-index-key": "off",
		"react/jsx-filename-extension": [2, { extensions: [".js", ".jsx", ".ts", ".tsx"] }],
		"react/function-component-definition": [
			1,
			{
				namedComponents: "arrow-function",
				unnamedComponents: "arrow-function",
			},
		],
		/* typescript-eslint options */
		"@typescript-eslint/no-empty-interface": "warn",
		"@typescript-eslint/adjacent-overload-signatures": "warn",
		"@typescript-eslint/no-dupe-class-members": "warn",
		"@typescript-eslint/no-misused-new": "warn",
		"@typescript-eslint/no-redeclare": "warn",
		"@typescript-eslint/no-array-constructor": "warn",
		"@typescript-eslint/no-namespace": "warn",
		"@typescript-eslint/no-var-requires": "warn",
		"@typescript-eslint/prefer-namespace-keyword": "warn",
		"@typescript-eslint/no-shadow": "off",
		"@typescript-eslint/no-empty-function": "off",
		"@typescript-eslint/type-annotation-spacing": "off",
		"@typescript-eslint/no-extra-semi": "off",
		"@typescript-eslint/member-ordering": "off",
		"@typescript-eslint/no-inferrable-types": "off",
		"@typescript-eslint/no-use-before-define": "off",
		"@typescript-eslint/no-non-null-asserted-optional-chain": "off",
		"@typescript-eslint/no-non-null-assertion": "off",
		"@typescript-eslint/no-unused-vars": "off",
		"@typescript-eslint/no-explicit-any": "off",
		"@typescript-eslint/semi": "off",
		"@typescript-eslint/ban-ts-ignore": "off",
		"@typescript-eslint/ban-ts-comment": "off",
		"@typescript-eslint/naming-convention": [
			"off",
			{
				selector: "default",
				format: ["camelCase"],
			},
			{
				selector: "variable",
				format: ["camelCase", "UPPER_CASE", "PascalCase"],
			},
			{
				selector: "function",
				format: ["camelCase", "PascalCase"],
			},
			{
				selector: "memberLike",
				format: ["camelCase", "UPPER_CASE"],
			},
			{
				selector: "typeLike",
				format: ["PascalCase", "UPPER_CASE"],
			},
			{
				selector: "enum",
				format: ["PascalCase"],
			},
			{
				selector: "enumMember",
				format: ["PascalCase", "UPPER_CASE"],
			},
		],
		"@typescript-eslint/indent": [
			"off",
			2,
			{
				SwitchCase: 1,
				VariableDeclarator: 1,
				outerIIFEBody: 1,
				MemberExpression: 1,
				FunctionDeclaration: {
					parameters: 1,
					body: 1,
				},
				FunctionExpression: {
					parameters: 1,
					body: 1,
				},
				CallExpression: {
					arguments: 1,
				},
				ArrayExpression: 1,
				ObjectExpression: 1,
				flatTernaryExpressions: false,
				ignoreComments: false,
			},
		],
		"@typescript-eslint/member-delimiter-style": [
			"off",
			{
				singleline: {
					delimiter: "semi",
					requireLast: false,
				},
			},
		],
		"@typescript-eslint/quotes": [
			"off",
			"single",
			{
				avoidEscape: true,
				allowTemplateLiterals: true,
			},
		],
		"@typescript-eslint/consistent-type-assertions": [
			"off",
			{
				assertionStyle: "as",
				objectLiteralTypeAssertions: "allow",
			},
		],
		"@typescript-eslint/triple-slash-reference": [
			"warn",
			{
				path: "never",
				types: "never",
				lib: "never",
			},
		],
		"@typescript-eslint/no-magic-numbers": [
			"off",
			{
				ignore: [-1, 0, 1, 2],
				ignoreNumericLiteralTypes: true,
				ignoreReadonlyClassProperties: true,
				ignoreEnums: true,
			},
		],
	},
	ignorePatterns: ["node_modules/"],
	settings: {
		react: {
			version: "detect"
		}
	}
};
