<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"	 xmlns:xsl="http://www.w3.org/1999/XSL/Transform" >

	<xsl:output method="xml" omit-xml-declaration="yes" indent="yes"	encoding="utf-8" />
	<xsl:param name="html-content-type" />

	<xsl:template match="/NavigationTree">
		<ul class="nav">
			<xsl:if test="count(//Page) > 0">
				<xsl:apply-templates select="Page" />
			</xsl:if>
		</ul>
	</xsl:template>

	<xsl:template match="//Page">
		<xsl:variable name="PageID" select="//GlobalTags/Global.Page.ID" />
		<xsl:variable name="UserID" select="//GlobalTags/Global.Extranet.UserID" />
		<xsl:variable name="UserName" select="//GlobalTags/Global.Extranet.Name" />

		<xsl:choose>
			<xsl:when test="(@NavigationTag='login') and ($UserID>0)">
				<li><span>Welcome back, <strong><xsl:value-of select="$UserName" /></strong></span></li>
				<li>
					<a class="left-spacing right-spacing">
						<xsl:if test="(@NavigationTag='login') and ($UserID=1)">
							<i class="icon-unlock-alt"><xsl:text> </xsl:text></i>
						</xsl:if>
						<xsl:attribute name="href">
							/Admin/Public/ExtranetLogoff.aspx?ID=<xsl:value-of select="//GlobalTags/Global.Page.ID" />
						</xsl:attribute>
						Logout
					</a>
				</li>
			</xsl:when>
			<xsl:otherwise>
				<li>
					<a>
						<xsl:choose>
							<xsl:when test="@NavigationTag">
								<xsl:choose>
									<xsl:when test="((@NavigationTag='myaccount') or (@NavigationTag='login')) and ($UserID=0)">
										<xsl:attribute name="id">quicklinks-<xsl:value-of select="@NavigationTag" /></xsl:attribute>
										<xsl:attribute name="data-target">#LoginBox</xsl:attribute>
										<xsl:attribute name="data-toggle">modal</xsl:attribute>
									</xsl:when>
									<xsl:otherwise>
										<xsl:attribute name="href">
											<xsl:value-of select="@FriendlyHref" disable-output-escaping="yes" />
										</xsl:attribute>
									</xsl:otherwise>
								</xsl:choose>
							</xsl:when>
							<xsl:otherwise>
								<xsl:attribute name="href">
									<xsl:value-of select="@FriendlyHref" disable-output-escaping="yes" />
								</xsl:attribute>
							</xsl:otherwise>
						</xsl:choose>
						<xsl:if test="(@NavigationTag='login') and ($UserID=0)">
							<i class="icon-lock"><xsl:text> </xsl:text></i>
						</xsl:if>
						<xsl:value-of select="@MenuText" disable-output-escaping="yes" />
					</a>
				</li>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>

</xsl:stylesheet>
