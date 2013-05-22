<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"  xmlns:xsl="http://www.w3.org/1999/XSL/Transform" >

  <!--
  Description: ul/li based navigation. No features from admin implemented.
  Recommended settings:
  Fold out: True or False
  Upper menu: Dynamic or Static
  First level: > 0
  Last level: >= First level
  -->

  <xsl:output method="xml" omit-xml-declaration="yes" indent="yes"  encoding="utf-8" />
  <xsl:param name="html-content-type" />

  <xsl:template match="/NavigationTree">
		<xsl:if test="count(descendant::Page[@InPath = 'True']) > 1">
			<xsl:apply-templates select="descendant::Page[@InPath = 'True' and position() > 1]" />
		</xsl:if>
  </xsl:template>

  <xsl:template match="Page[@InPath = 'True']">
    <li>
      <xsl:if test="@Active='True'">
        <xsl:attribute name="class">active</xsl:attribute>
      </xsl:if>
      <a>
        <xsl:attribute name="href">
          <xsl:value-of select="@FriendlyHref" disable-output-escaping="yes"/>
        </xsl:attribute>
        <xsl:value-of select="@MenuText" disable-output-escaping="yes"/>
      </a>
      <span class="divider sprite arr-forward-small"></span>
    </li>
  </xsl:template>
</xsl:stylesheet>
