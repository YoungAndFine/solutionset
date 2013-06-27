<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"	 xmlns:xsl="http://www.w3.org/1999/XSL/Transform" >

	<!--
	Description: ul/li based navigation. No features from admin implemented.
	Recommended settings:
	Fold out: True or False
	Upper menu: Dynamic or Static
	First level: > 0
	Last level: >= First level
	-->
	<xsl:output method="xml" omit-xml-declaration="yes" indent="yes"	encoding="utf-8" />
	<xsl:param name="html-content-type" />
	<xsl:template match="/NavigationTree">



	<div>
		<ul id="sitemap" class="sitemap">
			<xsl:apply-templates select="Page">
				<xsl:with-param name="depth" select="1"/>
			</xsl:apply-templates>
		</ul>
	</div>

	</xsl:template>

	<xsl:template match="Page">
		<xsl:param name="depth"/>
		<li>
			<a>
				<xsl:attribute name="href"><xsl:value-of select="@FriendlyHref" disable-output-escaping="yes"/></xsl:attribute>
				<xsl:value-of select="@MenuText"/>
			</a>
				<xsl:if test="count(Page)">
					<ul class="M{@AbsoluteLevel} sitemap">
						<xsl:apply-templates select="Page">
							<xsl:with-param name="depth" select="$depth+1"/>
						</xsl:apply-templates>
					</ul>
				</xsl:if>
		</li>
	</xsl:template>


</xsl:stylesheet>
