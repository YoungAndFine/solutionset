<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:output method="xml" omit-xml-declaration="yes" indent="yes" encoding="utf-8" />
	<xsl:param name="html-content-type" />

	<xsl:template match="/NavigationTree">
		<xsl:if test="Page">
			<ul>
				<xsl:attribute name="class">nav with-images</xsl:attribute>
				<xsl:apply-templates select="Page">
					<xsl:with-param name="depth" select="1"/>
				</xsl:apply-templates>
			</ul>
		</xsl:if>
	</xsl:template>

	<xsl:variable name="imageWidth" select="40"/>
	<xsl:variable name="imageHeight" select="40"/>

	<xsl:template match="Page">
		<xsl:param name="depth"/>
		<xsl:variable name="eComPageShow" select="//NavigationTree/Settings/LayoutNavigationSettings/@eComPageShow = 'true'"/>

		<xsl:choose>
			<xsl:when test="Page[@SmallImage]">
				<xsl:choose>
					<xsl:when test="$eComPageShow">
						<xsl:variable name="dropdown-target">
							<xsl:text>dropdown-</xsl:text>
							<xsl:number level="any"/>
						</xsl:variable>
						<li>
							<xsl:attribute name="class">
								<xsl:if test="@Active='True' or @InPath='True'">active </xsl:if>
								<xsl:if test="count(child::Page) &gt;0">dropdown</xsl:if>
							</xsl:attribute>
							<a>
								<xsl:if test="Page">
									<xsl:attribute name="class">dropdown-toggle</xsl:attribute>
									<xsl:attribute name="data-toggle">dropdown</xsl:attribute>
									<xsl:attribute name="data-target">#<xsl:value-of select="$dropdown-target"/></xsl:attribute>
								</xsl:if>
								<xsl:attribute name="href">
									<xsl:value-of select="@FriendlyHref" disable-output-escaping="yes"/>
								</xsl:attribute>
								<xsl:value-of select="@MenuText" disable-output-escaping="yes"/>
							</a>
							<xsl:if test="Page">
								<ul class="dropdown-menu" id="{$dropdown-target}">
									<xsl:for-each select="Page">
										<li>
											<a>
												<xsl:attribute name="href">
													<xsl:value-of select="@FriendlyHref" disable-output-escaping="yes"/>
												</xsl:attribute>
												<xsl:if test="string-length(normalize-space(@SmallImage)) > 1">
													<img class="nav-item-img" width="{$imageWidth}" height="{$imageWidth}" alt="">
														<xsl:attribute name="src">
															/Admin/Public/GetImage.ashx?Image=/Files<xsl:value-of select="@SmallImage" />&amp;Width=<xsl:value-of select="$imageWidth"/>&amp;Height=<xsl:value-of select="$imageHeight"/>
														</xsl:attribute>
													</img>
												</xsl:if>
												<xsl:value-of select="@MenuText" disable-output-escaping="yes"/>
											</a>
										</li>
									</xsl:for-each>
								</ul>
							</xsl:if>
						</li>
					</xsl:when>
					<xsl:otherwise>
						<xsl:for-each select="Page">
							<xsl:variable name="dropdown-target">
								<xsl:text>dropdown-</xsl:text>
								<xsl:number level="any"/>
							</xsl:variable>
							<li>
								<xsl:attribute name="class">
									<xsl:if test="@Active='True' or @InPath='True'">active </xsl:if>
									<xsl:if test="count(child::Page) &gt;0">dropdown</xsl:if>
								</xsl:attribute>
								<a>
									<xsl:if test="Page">
										<xsl:attribute name="class">dropdown-toggle</xsl:attribute>
										<xsl:attribute name="data-toggle">dropdown</xsl:attribute>
										<xsl:attribute name="data-target">#<xsl:value-of select="$dropdown-target"/></xsl:attribute>
									</xsl:if>
									<xsl:attribute name="href">
										<xsl:value-of select="@FriendlyHref" disable-output-escaping="yes"/>
									</xsl:attribute>
									<xsl:value-of select="@MenuText" disable-output-escaping="yes"/>
								</a>
								<xsl:if test="Page">
									<ul class="dropdown-menu" id="{$dropdown-target}">
										<xsl:for-each select="Page">
											<li>
												<a>
													<xsl:attribute name="href">
														<xsl:value-of select="@FriendlyHref" disable-output-escaping="yes"/>
													</xsl:attribute>
													<xsl:if test="string-length(normalize-space(@SmallImage)) > 1">
														<img class="nav-item-img" width="{$imageWidth}" height="{$imageWidth}" alt="">
															<xsl:attribute name="src">
																/Admin/Public/GetImage.ashx?Image=/Files<xsl:value-of select="@SmallImage" />&amp;Width=<xsl:value-of select="$imageWidth"/>&amp;Height=<xsl:value-of select="$imageHeight"/>
															</xsl:attribute>
														</img>
													</xsl:if>
													<xsl:value-of select="@MenuText" disable-output-escaping="yes"/>
												</a>
											</li>
										</xsl:for-each>
									</ul>
								</xsl:if>
							</li>
						</xsl:for-each>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:when>
			<xsl:otherwise>
				<xsl:variable name="dropdown-target">
					<xsl:text>dropdown-</xsl:text>
					<xsl:number level="any"/>
				</xsl:variable>
				<li>
					<xsl:attribute name="class">
						<xsl:if test="@Active='True' or @InPath='True'">active </xsl:if>
						<xsl:if test="count(child::Page) &gt;0">dropdown</xsl:if>
					</xsl:attribute>
					<a>
						<xsl:if test="Page">
							<xsl:attribute name="class">dropdown-toggle</xsl:attribute>
							<xsl:attribute name="data-toggle">dropdown</xsl:attribute>
							<xsl:attribute name="data-target">#<xsl:value-of select="$dropdown-target"/></xsl:attribute>
						</xsl:if>
						<xsl:attribute name="href">
							<xsl:value-of select="@FriendlyHref" disable-output-escaping="yes"/>
						</xsl:attribute>
						<xsl:value-of select="@MenuText" disable-output-escaping="yes"/>
					</a>
					<xsl:if test="Page">
						<ul class="dropdown-menu" id="{$dropdown-target}">
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
					</xsl:if>
				</li>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
</xsl:stylesheet>
