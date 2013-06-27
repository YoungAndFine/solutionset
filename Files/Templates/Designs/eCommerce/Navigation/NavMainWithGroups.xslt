<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"	 xmlns:xsl="http://www.w3.org/1999/XSL/Transform" >
	<xsl:output method="xml" omit-xml-declaration="yes" indent="yes"	encoding="utf-8" />
	<xsl:param name="html-content-type" />

	<xsl:template match="/NavigationTree">
		<xsl:if test="count(//Page) > 0">
			<ul>
				<!-- <xsl:attribute name="id">ul-ropdownmenu</xsl:attribute> -->
				<xsl:attribute name="class">nav</xsl:attribute>
				<xsl:apply-templates select="Page">
					<xsl:with-param name="depth" select="1"/>
				</xsl:apply-templates>
			</ul>
		</xsl:if>
	</xsl:template>

	<xsl:template match="//Page">
		<xsl:param name="depth"/>
		<xsl:choose>
			<xsl:when test="Page[@SmallImage]">
				<xsl:for-each select="Page">
					<li>
						<xsl:attribute name="class">
							<xsl:if test="@Active='True'">active </xsl:if>
							<!-- <xsl:if test="count(child::Page) &gt;0">dropdown</xsl:if> -->
						</xsl:attribute>
						<a>
							<!-- <xsl:attribute name="data-toggle">
								<xsl:if test="count(child::Page) &gt; 0">dropdown</xsl:if>
							</xsl:attribute> -->
							<xsl:attribute name="href">
								<xsl:value-of select="@FriendlyHref" disable-output-escaping="yes"/>
							</xsl:attribute>
							<xsl:value-of select="@MenuText" disable-output-escaping="yes"/>
						</a>
						<!-- <xsl:if test="count(child::Page) &gt;0">
							<ul class="dropdown-menu">
								<xsl:for-each select="Page">
									<li>
										<a>
											<xsl:attribute name="href">
												<xsl:value-of select="@FriendlyHref" disable-output-escaping="yes"/>
											</xsl:attribute>
											<xsl:value-of select="@MenuText" disable-output-escaping="yes"/>
										</a>
									</li>
								</xsl:for-each>
							</ul>
						</xsl:if> -->
					</li>
				</xsl:for-each>
			</xsl:when>
			<xsl:otherwise>
				<li>
					<xsl:attribute name="class">
						<xsl:if test="@Active='True'">active </xsl:if>
						<!-- <xsl:if test="count(child::Page) &gt;0">dropdown</xsl:if> -->
					</xsl:attribute>
					<a>
						<!-- <xsl:attribute name="data-toggle">
							<xsl:if test="count(child::Page) &gt; 0">dropdown</xsl:if>
						</xsl:attribute> -->
						<xsl:attribute name="href">
							<xsl:value-of select="@FriendlyHref" disable-output-escaping="yes"/>
						</xsl:attribute>
						<xsl:value-of select="@MenuText" disable-output-escaping="yes"/>
					</a>
					<!-- <xsl:if test="count(child::Page) &gt; 0">
						<div class="dropdown_1column">
							<xsl:for-each select="Page">
								<div class="col_1">
									<a>
										<xsl:attribute name="href">
											<xsl:value-of select="@FriendlyHref" disable-output-escaping="yes"/>
										</xsl:attribute>

										<xsl:value-of select="@MenuText" disable-output-escaping="yes"/>
									</a>
								</div>
							</xsl:for-each>
						</div>
					</xsl:if> -->
				</li>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
</xsl:stylesheet>
