import PropTypes from "prop-types";
import React from "react";

const Follow = ({ customFields }) => {
  const { title, urlTwitter, urlInstagram, urlFacebook, urlRSS, urlLinkdn, urlYoutube } =
    customFields;

  return (
    <div className="follow">
      <h2>{title}</h2>

      <a
        href={urlFacebook}
        target="_blank"
        className="vb_social_media_block facebook"
        rel="noreferrer"
      >
        <img
          alt="Facebook"
          src="data:image/svg+xml;utf8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0xNiwxVjE1YS45NC45NCwwLDAsMS0uMy43LDEsMSwwLDAsMS0uNy4zSDExVjkuNzhoMmwuMzQtMi4zSDExVjUuNjZhMS4wNiwxLjA2LDAsMCwxLC4yNS0uNzZBMSwxLDAsMCwxLDEyLDQuNjNoMS41VjIuNTVhMTEsMTEsMCwwLDAtMS42NC0uMSwzLjQ0LDMuNDQsMCwwLDAtMi40Ni44MSwzLDMsMCwwLDAtLjg1LDIuMjJ2MmgtMnYyLjNoMlYxNkgxYTEsMSwwLDAsMS0uNy0uM0EuOTQuOTQsMCwwLDEsMCwxNVYxQTEsMSwwLDAsMSwuMy4zLDEsMSwwLDAsMSwxLDBIMTVhMSwxLDAsMCwxLC43LjNBMSwxLDAsMCwxLDE2LDFaIi8+PC9zdmc+"
        />
        Facebook
      </a>
      <a
        href={urlTwitter}
        target="_blank"
        className="vb_social_media_block twitter"
        rel="noreferrer"
      >
        <img
          alt="Twitter"
          src="data:image/svg+xml;utf8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0xNiwzYTYuNTgsNi41OCwwLDAsMS0xLjYzLDEuN3YuNDNhOS4yMSw5LjIxLDAsMCwxLS4yOCwyLjIsMTAsMTAsMCwwLDEtLjgsMi4xNSw4LjQyLDguNDIsMCwwLDEtMS4zMywyQTkuNDQsOS40NCwwLDAsMSwxMC4xNCwxM2E4LjUzLDguNTMsMCwwLDEtMi4zMiwxLjA3QTkuNzgsOS43OCwwLDAsMSw1LDE0LjVhOS4xNSw5LjE1LDAsMCwxLTUtMS4zNCw0Ljc1LDQuNzUsMCwwLDAsLjc4LjA2LDUuNyw1LjcsMCwwLDAsMi4xNC0uNDIsNy4zOCw3LjM4LDAsMCwwLDEuOTMtMS4xNEEzLjA2LDMuMDYsMCwwLDEsMywxMSwzLjEzLDMuMTMsMCwwLDEsMS44LDkuMzhhMy40NiwzLjQ2LDAsMCwwLC42MS4wNywzLjE1LDMuMTUsMCwwLDAsLjg3LS4xMkEzLjIxLDMuMjEsMCwwLDEsMS40LDguMiwzLjE3LDMuMTcsMCwwLDEsLjY1LDYuMTF2MGEzLjI2LDMuMjYsMCwwLDAsMS40OC40MUEzLjM3LDMuMzcsMCwwLDEsMS4wNiw1LjNhMy4xNiwzLjE2LDAsMCwxLS40LTEuNTQsMy4yMSwzLjIxLDAsMCwxLC40NS0xLjYsOS4wNyw5LjA3LDAsMCwwLDMsMi4zOCw5LjM4LDkuMzgsMCwwLDAsMy43OCwxLDMuMjIsMy4yMiwwLDAsMS0uMDctLjc2LDMuMTgsMy4xOCwwLDAsMSwxLTIuMzEsMy4xNiwzLjE2LDAsMCwxLDIuMzItMSwzLjI1LDMuMjUsMCwwLDEsMi40MSwxLDYuNDIsNi40MiwwLDAsMCwyLjA3LS44LDMuMTIsMy4xMiwwLDAsMS0xLjQ0LDEuODJBNi4wNSw2LjA1LDAsMCwwLDE2LDNaIi8+PC9zdmc+"
        />
        Twitter
      </a>
      <a
        href={urlInstagram}
        target="_blank"
        className="vb_social_media_block instagram"
        rel="noreferrer"
      >
        <img
          alt="Instagram"
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIKdmlld0JveD0iMCAwIDE3MiAxNzIiCnN0eWxlPSIgZmlsbDojMDAwMDAwOyI+PGcgdHJhbnNmb3JtPSIiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PGcgZmlsbD0iI2ZmZmZmZiI+PHBhdGggZD0iTTQ5LjkyNTQ4LDBjLTI3LjQ5NTE5LDAgLTQ5LjkyNTQ4LDIyLjQzMDI5IC00OS45MjU0OCw0OS45MjU0OHY3Mi4xNDkwNGMwLDI3LjQ5NTE5IDIyLjQzMDI5LDQ5LjkyNTQ4IDQ5LjkyNTQ4LDQ5LjkyNTQ4aDcyLjE0OTA0YzI3LjQ5NTE5LDAgNDkuOTI1NDgsLTIyLjQzMDI5IDQ5LjkyNTQ4LC00OS45MjU0OHYtNzIuMTQ5MDRjMCwtMjcuNDk1MTkgLTIyLjQzMDI5LC00OS45MjU0OCAtNDkuOTI1NDgsLTQ5LjkyNTQ4ek00OS45MjU0OCwxMy4yMzA3N2g3Mi4xNDkwNGMyMC4zMzcxNCwwIDM2LjY5NDcxLDE2LjMzMTczIDM2LjY5NDcxLDM2LjY5NDcxdjcyLjE0OTA0YzAsMjAuMzM3MTQgLTE2LjMzMTczLDM2LjY5NDcxIC0zNi42OTQ3MSwzNi42OTQ3MWgtNzIuMTQ5MDRjLTIwLjMzNzE0LDAgLTM2LjY5NDcxLC0xNi4zMzE3MyAtMzYuNjk0NzEsLTM2LjY5NDcxdi03Mi4xNDkwNGMwLC0yMC4zMzcxNCAxNi4zMzE3MywtMzYuNjk0NzEgMzYuNjk0NzEsLTM2LjY5NDcxek0xMzUuNjE1MzgsMjYuNDYxNTRjLTUuNDc4MzcsMCAtOS45MjMwOCw0LjQ0NDcxIC05LjkyMzA4LDkuOTIzMDhjMCw1LjQ3ODM3IDQuNDQ0NzEsOS45MjMwOCA5LjkyMzA4LDkuOTIzMDhjNS40NzgzNywwIDkuOTIzMDgsLTQuNDQ0NzEgOS45MjMwOCwtOS45MjMwOGMwLC01LjQ3ODM3IC00LjQ0NDcxLC05LjkyMzA4IC05LjkyMzA4LC05LjkyMzA4ek04NiwzOS42OTIzMWMtMjUuNTA1NDEsMCAtNDYuMzA3NjksMjAuODAyMjggLTQ2LjMwNzY5LDQ2LjMwNzY5YzAsMjUuNTA1NDEgMjAuODAyMjgsNDYuMzA3NjkgNDYuMzA3NjksNDYuMzA3NjljMjUuNTA1NDEsMCA0Ni4zMDc2OSwtMjAuODAyMjggNDYuMzA3NjksLTQ2LjMwNzY5YzAsLTI1LjUwNTQxIC0yMC44MDIyOCwtNDYuMzA3NjkgLTQ2LjMwNzY5LC00Ni4zMDc2OXpNODYsNTIuOTIzMDhjMTguMzQ3MzYsMCAzMy4wNzY5MiwxNC43Mjk1NyAzMy4wNzY5MiwzMy4wNzY5MmMwLDE4LjM0NzM2IC0xNC43Mjk1NiwzMy4wNzY5MiAtMzMuMDc2OTIsMzMuMDc2OTJjLTE4LjM0NzM1LDAgLTMzLjA3NjkyLC0xNC43Mjk1NiAtMzMuMDc2OTIsLTMzLjA3NjkyYzAsLTE4LjM0NzM1IDE0LjcyOTU3LC0zMy4wNzY5MiAzMy4wNzY5MiwtMzMuMDc2OTJ6Ij48L3BhdGg+PC9nPjwvZz48L2c+PC9zdmc+"
        />
        Instagram
      </a>
      <a
        href={urlLinkdn}
        target="_blank"
        className="vb_social_media_block linkedin"
        rel="noreferrer"
      >
        <img
          alt="LinkedIn"
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIKdmlld0JveD0iMCAwIDE3MiAxNzIiCnN0eWxlPSIgZmlsbDojMDAwMDAwOyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgZm9udC1mYW1pbHk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub25lIiBmb250LXNpemU9Im5vbmUiIHRleHQtYW5jaG9yPSJub25lIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTAsMTcydi0xNzJoMTcydjE3MnoiIGZpbGw9Im5vbmUiPjwvcGF0aD48ZyBmaWxsPSIjZmZmZmZmIj48cGF0aCBkPSJNMjcuNTIsMTAuMzUzNTljLTExLjkzNjgsMCAtMjAuNjA2NDEsNy4xNTMzMiAtMjAuNjA2NDEsMTYuOTkxNzJjMCw5Ljg3MjggOC44NzYwMSwxNy4zNDEwOSAyMC42MDY0MSwxNy4zNDEwOWMxMS45MzY4LDAgMjAuNjA2NCwtNy4yOTE0NSAyMC42MDY0LC0xNy41NDI2NWMtMC41NTA0LC05Ljg3MjggLTkuMDQ4LC0xNi43OTAxNiAtMjAuNjA2NCwtMTYuNzkwMTZ6TTEwLjMyLDUxLjZjLTEuODkyLDAgLTMuNDQsMS41NDggLTMuNDQsMy40NHY5OS43NmMwLDEuODkyIDEuNTQ4LDMuNDQgMy40NCwzLjQ0aDM0LjRjMS44OTIsMCAzLjQ0LC0xLjU0OCAzLjQ0LC0zLjQ0di05OS43NmMwLC0xLjg5MiAtMS41NDgsLTMuNDQgLTMuNDQsLTMuNDR6TTYxLjkyLDUxLjZjLTEuODkyLDAgLTMuNDQsMS41NDggLTMuNDQsMy40NHY5OS43NmMwLDEuODkyIDEuNTQ4LDMuNDQgMy40NCwzLjQ0aDMwLjk2YzEuODk4ODgsMCAzLjQ0LC0xLjU0MTEyIDMuNDQsLTMuNDR2LTUxLjZ2LTAuODZ2LTAuODZjMCwtOC4xNTI4IDYuMjYyOTUsLTE0Ljc5MzYxIDE0LjI0Mzc1LC0xNS40MTI4MWMwLjQxMjgsLTAuMDY4OCAwLjgyMzQ1LC0wLjA2NzE5IDEuMjM2MjUsLTAuMDY3MTljMC40MTI4LDAgMC44MjM0NSwtMC4wMDE2MSAxLjIzNjI1LDAuMDY3MTljNy45ODA4LDAuNjE5MiAxNC4yNDM3NSw3LjI2MDAxIDE0LjI0Mzc1LDE1LjQxMjgxdjUzLjMyYzAsMS44OTg4OCAxLjU0MTEyLDMuNDQgMy40NCwzLjQ0aDMwLjk2YzEuODkyLDAgMy40NCwtMS41NDggMy40NCwtMy40NHYtNTguNDhjMCwtMjIuMjU2OCAtMTEuOTQwMDIsLTQ0LjcyIC0zOC41NjU2MywtNDQuNzJjLTEyLjEwODgsMCAtMjEuMjU1OTcsNC42NzkyIC0yNi43OTQzNyw4LjU2NjR2LTUuMTI2NGMwLC0xLjg5MiAtMS41NDgsLTMuNDQgLTMuNDQsLTMuNDR6Ij48L3BhdGg+PC9nPjwvZz48L3N2Zz4="
        />
        LinkedIn
      </a>
      <a
        href={urlYoutube}
        target="_blank"
        className="vb_social_media_block youtube"
        rel="noreferrer"
      >
        <img
          alt="YouTube"
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIKdmlld0JveD0iMCAwIDE3MiAxNzIiCnN0eWxlPSIgZmlsbDojMDAwMDAwOyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgZm9udC1mYW1pbHk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub25lIiBmb250LXNpemU9Im5vbmUiIHRleHQtYW5jaG9yPSJub25lIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTAsMTcydi0xNzJoMTcydjE3MnoiIGZpbGw9Im5vbmUiPjwvcGF0aD48ZyBmaWxsPSIjZmZmZmZmIj48cGF0aCBkPSJNODUuNDg5MSwzMC40NTgzM2MtMjIuNzYzODYsMCAtNDMuOTE0MDMsMS42MjE5IC01NS45ODI1OSw0LjE0MzIzYy0wLjAyNTcxLDAuMDA2ODEgLTAuMDUxMzgsMC4wMTM4MSAtMC4wNzY5OSwwLjAyMWMtOS4wOTI0LDIuMDM3NDIgLTE3LjY1NDAxLDguNTUwMjggLTE5LjQ1NjM4LDE4Ljc0OTUxYy0wLjAwMjM5LDAuMDEzOTkgLTAuMDA0NzIsMC4wMjc5OSAtMC4wMDcsMC4wNDE5OWMtMS4zODQ2NSw4LjIyMDIyIC0yLjc5OTQ4LDE4LjkzNTkyIC0yLjc5OTQ4LDM0LjM3NzZjMCwxNS40MTI0NiAxLjQxOTY4LDI1Ljg0NDE2IDMuMTcwNDEsMzQuNDk2NThjMS44NDY1Myw5Ljg5ODQgMTAuMjEwNTMsMTYuNjA4MjYgMTkuNDQyMzgsMTguNjcyNTNjMC4wNDQxNywwLjAxMjIzIDAuMDg4NSwwLjAyMzg5IDAuMTMyOTcsMC4wMzQ5OWMxMi41OTU2MSwyLjQ4MTkyIDMzLjE0ODc0LDQuMTI5MjMgNTUuOTEyNiw0LjEyOTIzYzIyLjc2Mzg2LDAgNDMuMzI3OTMsLTEuNjQ3MzMgNTUuOTI2NiwtNC4xMjkyM2MwLjA0NDQ3LC0wLjAxMTEgMC4wODg4LC0wLjAyMjc2IDAuMTMyOTcsLTAuMDM0OTljOS4wOTI0LC0yLjAzNzQzIDE3LjY1NDAxLC04LjU1MDI4IDE5LjQ1NjM4LC0xOC43NDk1MWMwLjAwNDg1LC0wLjAyNTYzIDAuMDA5NTIsLTAuMDUxMjkgMC4wMTQsLTAuMDc2OTljMS4zNjM0MywtOC4zODc5MiAzLjEzMDEsLTE5LjA5MzMgMy40NzgzNSwtMzQuNTU5NTdjMC4wMDA0NCwtMC4wMzk2NiAwLjAwMDQ0LC0wLjA3OTMyIDAsLTAuMTE4OThjMCwtMTUuNDc0ODEgLTEuNzcxMjEsLTI2LjI1NzE0IC0zLjQ5OTM1LC0zNC43OTc1M2MtMS44MzE5NiwtOS45MTk1MiAtMTAuMjA1NTUsLTE2LjY0NzU3IC0xOS40NDkzOCwtMTguNzE0NTJjLTAuMTQxMjEsLTAuMDMxNCAtMC4yODM2NCwtMC4wNTcwOCAtMC40MjY5MiwtMC4wNzY5OWMtMTIuMjkxNDEsLTEuNzI3OTYgLTMzLjIwMTE5LC0zLjQwODM3IC01NS45Njg1OCwtMy40MDgzN3pNNzIuMjI2NTYsNjAuOTIzNjZjMS4zMjcyOSwtMC4wMjc0MyAyLjY5OTI2LDAuMjg2NSAzLjk4OTI2LDEuMDE0ODFsMzAuODI5MjcsMTcuNDE5NzZjNS4xOTk0MiwyLjkzODMzIDUuMTk5NDIsMTAuMzUyMiAwLDEzLjI5MDUzbC0zMC44MjkyNywxNy40MTk3NmMtNS4xNTY0MiwyLjkwOTY3IC0xMS41ODI4NSwtMC43NzU2OCAtMTEuNTgyODUsLTYuNjQ4NzZ2LTM0LjgzOTUyYzAsLTQuNDA0ODEgMy42MTE3MiwtNy41NzQyNyA3LjU5MzU5LC03LjY1NjU4eiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+"
        />
        YouTube
      </a>
      <a href={urlRSS} target="_blank" className="vb_social_media_block rss" rel="noreferrer">
        <img
          alt="RSS"
          src="data:image/svg+xml;utf8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0xNiwxNS42NmEuMzQuMzQsMCwwLDEtLjM0LjM0SDEzLjM0YS4zNC4zNCwwLDAsMS0uMzQtLjM0LDEyLjYsMTIuNiwwLDAsMC0uNDUtMy4zNiwxMi40MiwxMi40MiwwLDAsMC0xLjI3LTMsMTIuODYsMTIuODYsMCwwLDAtMi0yLjU2LDEyLjg2LDEyLjg2LDAsMCwwLTIuNTYtMiwxMi44MiwxMi44MiwwLDAsMC0zLTEuMjdBMTIuNiwxMi42LDAsMCwwLC4zNCwzLC4zLjMsMCwwLDEsLjEsMi45LjMuMywwLDAsMSwwLDIuNjZWLjM0QS4zLjMsMCwwLDEsLjEuMS4zLjMsMCwwLDEsLjM0LDAsMTUuNzQsMTUuNzQsMCwwLDEsNC41LjU2LDE1LjQxLDE1LjQxLDAsMCwxLDguMjQsMi4xNGExNS44MiwxNS44MiwwLDAsMSwzLjE3LDIuNDUsMTUuODIsMTUuODIsMCwwLDEsMi40NSwzLjE3LDE1LjQxLDE1LjQxLDAsMCwxLDEuNTgsMy43NEExNS43NCwxNS43NCwwLDAsMSwxNiwxNS42NlptLTUsMGEuMzQuMzQsMCwwLDEtLjM0LjM0SDguMzRBLjM0LjM0LDAsMCwxLDgsMTUuNjZhNy40Myw3LjQzLDAsMCwwLS42MS0zQTcuNTIsNy41MiwwLDAsMCwzLjMyLDguNjEsNy40Myw3LjQzLDAsMCwwLC4zNCw4LC4zLjMsMCwwLDEsLjEsNy45LjMuMywwLDAsMSwwLDcuNjZWNS4zNEEuMy4zLDAsMCwxLC4xLDUuMS4zLjMsMCwwLDEsLjM0LDVhMTAuNzEsMTAuNzEsMCwwLDEsMi44Mi4zOEExMSwxMSwwLDAsMSw1LjcyLDYuNDUsMTEuMTUsMTEuMTUsMCwwLDEsNy44OCw4LjEyYTExLjE1LDExLjE1LDAsMCwxLDEuNjcsMi4xNiwxMSwxMSwwLDAsMSwxLjA3LDIuNTZBMTAuNzEsMTAuNzEsMCwwLDEsMTEsMTUuNjZaTTUsMTMuNWEyLjQ1LDIuNDUsMCwwLDEtLjczLDEuNzdBMi40MSwyLjQxLDAsMCwxLDIuNSwxNmEyLjM4LDIuMzgsMCwwLDEtMS43Ny0uNzNBMi4zOCwyLjM4LDAsMCwxLDAsMTMuNWEyLjQxLDIuNDEsMCwwLDEsLjczLTEuNzdBMi40NSwyLjQ1LDAsMCwxLDIuNSwxMWEyLjQxLDIuNDEsMCwwLDEsMS43Ni43NEEyLjQxLDIuNDEsMCwwLDEsNSwxMy41WiIvPjwvc3ZnPg=="
        />
        RSS
      </a>
    </div>
  );
};

Follow.label = "Follow Chalkbeat - Civic";
Follow.description = "Follow Social Networks";
Follow.static = true;

Follow.propTypes = {
  customFields: PropTypes.shape({
    title: PropTypes.string.tag({
      defaultValue: "Follow Chalkbeat",
      label: "Title",
      group: "Configure Content",
    }),
    urlTwitter: PropTypes.string.tag({
      defaultValue: "https://twitter.com/chalkbeatco",
      label: "Twitter URL",
      group: "Configure Content",
    }),
    urlInstagram: PropTypes.string.tag({
      defaultValue: "https://www.instagram.com/chalkbeatorg/",
      label: "Instagram URL",
      group: "Configure Content",
    }),
    urlFacebook: PropTypes.string.tag({
      defaultValue: "https://www.facebook.com/Chalkbeatco/",
      label: "Facebook URL",
      group: "Configure Content",
    }),
    urlRSS: PropTypes.string.tag({
      defaultValue: "https://www.votebeat.org/rss/latest-news/index.xml",
      label: "RSS URL",
      group: "Configure Content",
    }),
    urlLinkdn: PropTypes.string.tag({
      defaultValue: "https://www.linkedin.com/company/chalkbeat",
      label: "Linkdn URL",
      group: "Configure Content",
    }),
    urlYoutube: PropTypes.string.tag({
      defaultValue: "https://www.youtube.com/chalkbeat",
      label: "Youtube URL",
      group: "Configure Content",
    }),
  }),
};

export default Follow;
